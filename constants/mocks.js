const categories = [
     {
          id: "transfers",
          name: "transfers",
          screen: "None",
          desc: "Transfer to another account !",
          image: require("../assets/images/transfer.png")
     },
     {
          id: "pays",
          name: "pays",
          screen: "None",
          desc: "Pay your bills !",
          image: require("../assets/images/pay.png")
     },
     {
          id: "histories",
          name: "histories",
          screen: "None",
          desc: "Check all your transactions !",
          image: require("../assets/images/history.png")
     },
     {
          id: "charges",
          name: "charges",
          screen: "Charge",
          desc: "Charge money to your account !",
          image: require("../assets/images/charge.png")
     },
];

const products = [
     {
          id: 1,
          name: "16 Best Plants That Thrive In Your Bedroom",
          description:
          "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
          tags: ["Interior", "27 m²", "Ideas"],
          images: [
               require("../assets/images/illustration_1.png"),
               require("../assets/images/illustration_1.png"),
               require("../assets/images/illustration_1.png"),
               // showing only 3 images, show +6 for the rest
               require("../assets/images/illustration_1.png"),
               require("../assets/images/illustration_1.png"),
               require("../assets/images/illustration_1.png"),
               require("../assets/images/illustration_1.png"),
               require("../assets/images/illustration_1.png"),
               require("../assets/images/illustration_1.png")
          ]
     }
];

const explore = [
     // images
     require("../assets/images/illustration_2.png"),
     require("../assets/images/illustration_2.png"),
     require("../assets/images/illustration_2.png"),
     require("../assets/images/illustration_2.png"),
     require("../assets/images/illustration_2.png"),
     require("../assets/images/illustration_2.png")
];

const profile = {
     username: "react-ui-kit",
     location: "Europe",
     email: "contact@react-ui-kit.com",
     avatar: require("../assets/images/illustration_3.png"),
     budget: 1000,
     monthly_cap: 5000,
     notifications: true,
     newsletter: false
};

export { categories, explore, products, profile };
