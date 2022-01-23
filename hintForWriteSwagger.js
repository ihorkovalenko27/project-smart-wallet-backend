const sw = {
    "paths": {
        // endpoint 
        "/users/register": {
            // method
            "post": {
                // end point group
                "tags": ["Auth"],
                // description
                "summary": "User registration",

                "parameters": [{
                    //if i get req from req.params
                    "in": "path",
                    "name": "password",
                    "required": true,
                    "type": "string",
                    "description" : "Users pass",
                }, {
                    // if more then one req.params
                    }],
                "security": [{ "Bearer": [] }],

                //req object
                "requestBody": {
                    "description": "Registration's object",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                // taking from components schemas
                                "$ref": "#/components/schemas/RegistrationRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/RegistrationResponse"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad request (invalid request body)",
                        "content": {}
                    },
                    "409": {
                        "description": "Provided email already exists",
                        "content": {}
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "RegistrationRequest": {
                "type": "object",
                "required": ["email"],
                "properties": {
                    "email": {
                        "type": "string",
                        "description": "User's email",
                        "format": "email"
                    },
                    "password": {
                        "type": "string",
                        "description": "User's password. Min length 6 characters.",
                        "example": "qwerty123"
                    }
                }
            },
            "RegistrationResponse": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "email": {
                            "type": "string",
                            "description": "User's email",
                            "format": "email"
                        },
                        "userId": {
                            "type": "number",
                            "description": "User's id",
                            "example": "32143232436545474"
                        }
                    }
                },
                "example": [
                    { "email": "1@gmail.com", "userId": "1" },
                    { "email": "2@gmail.com", "userId": "2" }
                ]
            }
        },
        "securitySchemes": {
            "Bearer": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    }
}