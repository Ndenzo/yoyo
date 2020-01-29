const colors = {
     accent: "#F3534A",
     primary: "#6689BF",
     secondary: "#77B7E8",
     tertiary: "#FFE358",
     black: "#323643",
     white: "#FFFFFF",
     gray: "#9DA3B4",
     gray2: "#C5CCD6"
};

const sizes = {
     // global sizes
     base: 16,
     font: 14,
     radius: 6,
     padding: 25,

     // font sizes
     h1: 26,
     h2: 20,
     h3: 18,
     title: 18,
     header: 16,
     body: 14,
     caption: 12,

     // icon sizes
     sm: 25,
     md: 50,
     lg: 100,
     xl: 150,
};

const fonts = {
     h1: {
          fontSize: sizes.h1
     },
     h2: {
          fontSize: sizes.h2
     },
     h3: {
          fontSize: sizes.h3
     },
     header: {
          fontSize: sizes.header
     },
     title: {
          fontSize: sizes.title
     },
     body: {
          fontSize: sizes.body
     },
     caption: {
          fontSize: sizes.caption
     }
};

const screen = {
    header: {
        marginTop: 70,
        textAlign: "center",
        color: "#F3877A",
    }
}

export { colors, sizes, fonts, screen };
