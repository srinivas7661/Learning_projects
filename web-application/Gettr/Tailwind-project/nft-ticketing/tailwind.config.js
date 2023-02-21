/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    screens: {
      // specifying screens is mandatory in every tailwind.config file
      xs: { min: "320px", max: "480px" },
      sm: { min: "481px", max: "640px" },
      md: { min: "641px", max: "768px" },
      lg: { min: "769px", max: "900px" },
      xl: { min: "900px", max: "1024px" },
      mbl: { min: "0px", max: "650px" },
      xr: "1100px",
      mb: "500px",
      stb: "600px",
      tb: "650px",
      "2xl": { min: "1025px", max: "1290px" },
      "2.5xl": "1100px",
      "3xl": { min: "1291px", max: "1440px" },
      "3.5xl": "1300px",
      "4xl": "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: {
        50: "#0D0F37",
      },

      blue: {
        50: "#3D61B0",
        75: "#26458C",
        100: "#395FF1",
      },
      grey: {
        50: "#EBECEF",
        75: "#525272",
        100: "#F3F3F6",
        150: "#949CAE",
        200: "#949CAE2E",
        250: "#F7F7F9",
        300: "#949CAE33",
      },
      red: {
        50: "#FF6142",
      },

      darkGrey: {
        50: "#333333",
      },
      brown: {
        50: "#FAD59A",
      },
      green: {
        50: "#ABD559",
      },
      orange: {
        50: "#FAD59A",
      },
    },

    fontSize: {
      ft10: [
        "10px",
        {
          letterSpacing: "0em",
          lineHeight: "14px",
        },
      ],
      ft14: [
        "14px",
        {
          letterSpacing: "0em",
          lineHeight: "19px",
        },
      ],
      ft16: [
        "16px",
        {
          letterSpacing: "0em",
          lineHeight: "22px",
        },
      ],
      ft18: [
        "18px",
        {
          letterSpacing: "0em",
          lineHeight: "24px",
        },
      ],
      ft20: [
        "20px",
        {
          letterSpacing: "0em",
          lineHeight: "27px",
        },
      ],
      ft22: [
        "22px",
        {
          letterSpacing: "0em",
          lineHeight: "30px",
        },
      ],
      ft24: [
        "24px",
        {
          letterSpacing: "0em",
          lineHeight: "33px",
        },
      ],
    },

    fontFamily: {
      OpenSansSemiBold: ["OpenSans-SemiBold", "sans-serif"],
      OpenSansRegular: ["OpenSans-Regular", "sans-serif"],
    },

    borderRadius: {
      xsm: "5px",
      sm: "10px",
      lsm: "25px",
      md: "35px",
    },

    extend: {
      spacing: {
        "9px": "9px", //don't place more than two decimals
        2.75: "11px",
        3.25: "13px",
        3.5: "14px",
        4.5: "18px",
        7.5: "30px",
        8.5: "34px",
        12.5: "50px",
        13: "52px",
        13.5: "54px",
        14.5: "58px",
        15: "60px",
        16: "64px",
        17.5: "70px",
        25: "100px",
        30: "120px",
        37.5: "150px",
        38: "152px",
        42: "168px",
        42.5: "170px",
        62.5: "250px",
        75: "300px",
        76: "304px",
        79: "316px",
        100: "400px",
        115: "460px",
        125: "500px",
        133.5: "534px",
        145: "580px",
        145: "600px",
        148: "612px",
        279: "1116px",
        "2per": "2%", //per in percentage
        "3pe": "3%",
        "5pe": "5%",
        "7.5pe": "7.5%", //don't do this
        "10pe": "10%",
        "17pe": "17%",
        "30pe": "30%",
        "40pe": "40%",
        "48pe": "45%",
        "60pe": "60%",
        "80pe": "80%",
        "90pe": "90%",
        "95pe": "95%",
      },
      maxWidth: {
        115: "460px",
        1600: "1600px",
      },
      minWidth: {
        60: "240px",
        300: "300px",
      },
    },
  },
  plugins: [],
};
