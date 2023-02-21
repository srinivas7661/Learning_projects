module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    screens: {
      xs: { min: "320px", max: "450px" },
      sm: { min: "450px", max: "760px" },
      md: { min: "760px", max: "1100px" },
      lg: { min: "1100px", max: "2000px" },
      xl: { min: "1300px", max: "2000px" },
      xlg: { min: "1650px", max: "2000px" },
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      balck: {
        50: "#1C1C1C",
      },

      blue: {
        50: "#CFEDFF",
        100: "#F8FBFF",
        150: "#6A4FC3",
        200: "#72C4F4",
        250: "#236ECB",
      },
      violet: {
        50: "#512C99",
        100: "#3828BE",
        150: "#A87BFF",
        200: "#CEBCFF",
        250: "#502D9A",
      },
      grey: {
        50: "#808080",
        100: "#D3D3D3",
        150: "#484848",
        200: "#4E4E4E",
      },
      green: {
        50: "#23BA95",
        100: "#CAF5EF",
      },
    },
    fontSize: {
      ft0: [
        "12px",
        {
          //Poppins Regular
          letterSpacing: "0em",
          lineHeight: "16px",
        },
      ],
      ft14: [
        "14px",
        {
          //Poppins Regular
          letterSpacing: "0em",
          lineHeight: "16px",
        },
      ],
      ft15: [
        "15px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft16: [
        "16px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft18: [
        "18px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft20: [
        "20px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft22: [
        "22px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft23: [
        "23px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft24: [
        "24px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft28: [
        "28px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft32: [
        "32px",
        {
          //Poppins Regular
          letterSpacing: "0em",
        },
      ],
      ft36: [
        "36px",
        {
          //Poppins Regular
          letterSpacing: "0em",
          lineHeight: "42px",
        },
      ],
      ft46: [
        "46px",
        {
          //Poppins Regular
          letterSpacing: "0em",
          lineHeight: "40px",
        },
      ],
      ft50: [
        "50px",
        {
          //Poppins Regular
          letterSpacing: "0em",
          lineHeight: "60px",
        },
      ],
    },
    fontFamily: {
      PoppinsBold: ["OpenSans-Bold", "sans-serif"],
      PoppinsSemiBold: ["OpenSans-SemiBold", "sans-serif"],
      PoppinsRegular: ["OpenSans-Regular", "sans-serif"],
      PoppinsMedium: ["OpenSans-Medium", "sans-serif"],
    },
    extend: {
      spacing: {
        "3per": "3%",
        "5per": "5%",
        "10per": "10%",
        "20per": "10%",
        "40per": "40%",
        "60per": "60%",
        "65per": "65%",
        "70per": "70%",
        "80per": "80%",
        "90per": "90%",
        "95per": "95%",
        6.5: "26px",
        7.5: "26px",
        9.5: "38px",
        10.5: "42px",
        12.5: "50px",
        13: "52px",
        14.5: "58px",
        15: "60px",
        18.5: "74px",
        19: "76px",
        19.5: "78px",
        22: "88px",
        23: "92px",
        28.5: "114px",
        31: "124px",
        "115px": "115px",
        "157px": "157px",
        43.5: "174px",
        50: "200px",
        57.5: "230px",
        65: "260px",
        75: "300px",
        80: "320px",
        87.5: "350px",
        90: "360px",
        92.5: "370px",
        95: "380px",
        98: "392px",
        107.5: "430px",
        110: "440px",
        112.5: "450px",
        113.5: "454px",
        115: "460px",
        118: "472px",
        130: "520px",
        144: "576px",
        160: "640px",
        183.5: "734px",
        299: "1196px",
        312.5: "1250px",
      },
    },
  },

  plugins: [],
};
