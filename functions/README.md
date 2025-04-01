# Firebase Cloud Functions for User Management

This directory contains Firebase Cloud Functions to help with user management in the ERP system.

## Available Functions:

### `deleteUserAccount`

This function deletes a user from Firebase Authentication. It can only be called by authenticated administrators.

## Deployment

To deploy these functions:

1. Install Firebase CLI if you haven't already:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Navigate to the project root directory and run:
   ```
   firebase deploy --only functions
   ```

## Usage

Once deployed, these functions can be called from the client-side code using the Firebase Functions SDK.

Example:
```javascript
const deleteUserAccount = httpsCallable(functions, 'deleteUserAccount');
const result = await deleteUserAccount({ userId: 'user-id-to-delete' });
```

## Security

The functions include security checks to ensure:
1. Only authenticated users can call them
2. Only users with admin role can delete accounts
3. Proper error handling for various scenarios 