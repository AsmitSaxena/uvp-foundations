const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/**
 * Cloud Function to delete a user from Firebase Authentication
 * This can only be called from trusted environments (like your server)
 * or via a secure mechanism from your client app
 */
exports.deleteUserAccount = functions.https.onCall(async (data, context) => {
  try {
    // Check if request is made by an authenticated admin
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'You must be signed in to perform this action.'
      );
    }
    
    // Get the admin user to check if they have admin rights
    const adminUserSnapshot = await admin.firestore()
      .collection('adminsAndMentors')
      .doc(context.auth.uid)
      .get();
    
    if (!adminUserSnapshot.exists || 
        !adminUserSnapshot.data().role || 
        !adminUserSnapshot.data().role.includes('admin')) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Only administrators can delete user accounts.'
      );
    }
    
    // Extract the user ID to delete from the request data
    const userIdToDelete = data.userId;
    if (!userIdToDelete) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with a valid userId parameter.'
      );
    }
    
    // Delete the user from Firebase Authentication
    await admin.auth().deleteUser(userIdToDelete);
    
    // Return success response
    return { success: true, message: 'User successfully deleted from authentication.' };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new functions.https.HttpsError(
      'internal',
      'An error occurred while trying to delete the user: ' + error.message
    );
  }
}); 