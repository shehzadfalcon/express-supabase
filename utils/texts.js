module.exports = {
  ERRORS: {
    //USER ERRORS

    passwordInvalid: "Invalid password!",
    accountExists: "Account exists with this email!",
    userNotExists: "User does not exist!",
    userAlreadyExists: "User already exists with this email!",
    productNotFound: "Product not found!",
    productAlreadyExist: "Product already exist!",


  },

  TEXTS: {
    userCreated: "User created successfully",
    userLogin: "User login successfully",
    userLoggedOut: "User logout successfully",
    userUpdated: "User updated successfully",
    passwordUpdated: "Password updated successfully",

    userAlreadyRegisteredWithEmail:
      "User is already registered with this email",

    accountDeleted: "Account deleted successfully",

    profileData: "Profile Data",
    profileUpdated: "Profile Updated",
    productsFetched:"Products fetched successfully!",
    productsCreated:"Product created successfully!",
    productsUpdated:"Product updated successfully!"


  },

  STATUS_CODE: {
    NOT_FOUND: 404,
    EXISTS: 400,
    INTERNAL_SERVER_ERROR: 500,
    SUCCESS: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
  },
};
