// locales/en.ts
export default {
  menuBar: {
    feed: "News Feed",
    discussions: "Discussions",
    friends: "Friends",
    market_place: "Marketplace",
    wallet: "My Wallets",
    media: "Media",
    settings: "Settings",
  },

  asideMenuBar: {
    stories: "Stories",
    suggestions: "Suggestions",
    see_all: "See All",
  },

  home: {
    feeds: {
      new_feed_btn: "New Feed",
      title: "Feeds",
      tab_recent: "Recent",
      tab_popular: "Popular",
      item_like: "Like",
      item_dislike: "Dislike",
      item_comment: "Comment",
      item_share: "Share",
      item_delete: "Delete",
      item_edit: "Edit",
      not_found: "Feed Not Found",

      popup: {
        add_form: {
          title: "@New_Feed",
          subtitle: "Write the message and then click button.",
          add_feed_btn: "Post Now",
        },
        edit_form: {
          title: "@Edit_Feed",
          subtitle: "Write the message and then click button.",
          edit_feed_btn: "Edit Now",
        },
      },
    },
  },

  discussions: {
    title: "Discussions",
    tab_users: "Users",
    tab_groups: "Groups",
  },

  friends: {
    title: "Friends",
    tab_recommend: "Recommended",
    tab_matches: "Matches",
    profile_details_btn: "Visit Profile",

    say_hi: {
      title: "Say Hi!",
      subtitle: "Say hi to your friends",
      send_btn: "Ok, Say Hi!",
      continue_btn: "Ok, Continue",
      new_conversation: "Start a new conversation with",
      continue_conversation: "Continue your conversation with",
      close: "close",
    },
  },

  settings: {
    title: "Settings",
    profile: {
      title: "Profile settings",
      edit_profile: "Edit My Profile",
      account_visibility: "Account Visibility",
      account_visibility_desc:
        "Turn this off to hide your profile to all unmatched users",
      auto_approve_match: "Auto Approve Match Requests",
      auto_approve_match_desc:
        "Turn this on to automatically approve match requests",
      current_language: "Current Language",
      delete_account: "Delete My Account",
      change_lang_text: "Change",
      sign_out: "Sign Out",
    },
    theme: {
      title: "Customize your app theme",
      subTitle: "Current theme",
      dark_mode: "Dark Mode",
      light_mode: "Light Mode",
      dark_mode_on: "Dark Mode On",
    },
  },

  stories: {
    popup: {
      storiesText: {
        title: "Stories Text",
        subtitle: "Publish a text stories on your board",
        add_story_btn: "Add Story",
      },
      photoStories: {
        title: "Photo Stories",
        subtitle: "Publish a photo stories on your board",
        add_story_btn: "Add Story",
      },
      videoStories: {
        title: "Video Stories",
        subtitle: "Publish a video stories on your board",
        add_story_btn: "Add Story",
      },
      close_popup_text: "Cancel",
    },
  },

  profile: {
    title: "Profile",
    edit_profile: "Edit",
    user_name: "Your User Name",
    email: "Your Email Address",
    country: "Your Country",
    full_name: "Your Full Name",

    edit_form: {
      title: "Edit Profile",
      subtitle: "Enter your email and password to Sign In.",
      save_btn: "Save",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      confirm_password: "Confirm Password",
    },

    click_to_upload: "Click to upload",
    or_drag_and_drop: "Or Drag and Drop",
  },

  authentication: {
    twoStepToken: {
      title: "2 Step Verification",
      subtitle: "Proceed with the otp code verification.",
      proceed_btn: "Proceed",
      resend: "Resend",
      back_to_signin: "Back to Sign In",
      did_not_received_otp: "Didn't received otp?",

      form: {
        otp_code: "OTP code",
      },
    },

    signUp: {
      title: "Sign Up",
      subtitle: "Enter your email and password to Sign Up.",
      sign_up_btn: "Sign Up",
      go_to_signin: "Go to Sign In",
      already_have_account: "Already have an account?",

      form: {
        step_one: {
          title: "Account Identity",
          user_name: "How can we call you?",
          user_email: "What's your email address?",
          confirm_btn: "Next Step: Personal Details",
        },
        step_two: {
          title: "What's your mobile number?",
          country_select: "Select Country",
          phone_number: "Phone Number",
          confirm_btn: "Next step: Security",
        },
        step_three: {
          title: "Account Security",
          password: "Password",
          confirm_password: "Confirm Password",
          confirm_btn: "Proceed",
        },
        step_four: {
          title: "Congratulations",
          subtitle: "Your account {name} has been created successfully.",
          subtitle2: "Check your email address to activate your account",
          go_to_sign_in: "Go to Sign In",
        },
      },
    },

    changePassword: {
      title: "Change Account Password",
      sign_in: "Sign in",
      sign_up: "Sign Up",
      form: {
        password: "Enter new password",
        confirm_password: "Confirm new password",
        confirm_btn: "Proceed",
      },
    },

    forgetPassword: {
      title: "Forget Password",
      sign_in: "Sign in",
      sign_up: "Sign Up",
      form: {
        email: "Email",
        confirm_btn: "Proceed",
      },
    },

    signIn: {
      title: "Sign In",
      subtitle: "Enter your email and password to Sign In.",
      sign_up: "Sign Up",
      rest_password_here: "Reset Password Here!",

      form: {
        username: "User Name",
        password: "Password",
        remember_me: "Remember me",
        confirm_btn: "Proceed",
      },
    }
  },

  marketPlace: {
    title: "Market Place",
    latest: "Latest",
    recommended: "Recommended",
    features: "Features",
    see_more: "See more",

    products: {
      details: {
        popup: {
          close: "Close",
          deal_now: "Deal Now",
          share: "Share",
          description: "Description",
          price: "Price",
          seller: "Seller",
        }
      }
    },

    emptyCart: {
      title: "Your Shopping Cart is Empty",
      subtitle: "Add some products to your cart",
      back_to_marketplace: "Back to marketplace",
    }
  }
} as const;
