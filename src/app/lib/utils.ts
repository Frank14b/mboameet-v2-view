export const passwordRegex: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
export const passwordErrorMessage: string = "Password must contains upper, lowercase, number, special char and min 8 digits";
export const invalidEmailErrorMessage: string = "Invalid email e.g: example@test.com"
export const requiredEmailErrorMessage: string = "Email address is required"
export const defaultProfileImg = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"

// export const generateBrowserId = async (): Promise<string | null> => {
//     if (!window) return null; // Check for window object (client-side)

//     // Use modern properties for navigator information:
//     const navigatorInfo = navigator.userAgent;

//     // Avoid plugins for compatibility and privacy:
//     const screenResolution = `${screen.width}x${screen.height}`;
//     const timeZone = new Date().getTimezoneOffset();

//     // Compose browserId without plugins:
//     const browserId = `${navigatorInfo}${screenResolution}${timeZone}`;

//     // Hash the browserId using a more secure algorithm:
//     const hashedBrowserId = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(browserId))
//     //   .then(hashedBuffer => btoa(String.fromCharCode(...new Uint8Array(hashedBuffer))));

//   };