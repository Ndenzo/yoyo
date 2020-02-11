const categories = [
     {
          id: "transfers",
          name: "Transfers",
          screen: "Transfer",
          desc: "Transfer to another account !",
          image: require("../assets/images/transfer.png")
     },
     {
          id: "pays",
          name: "Pays",
          screen: "Pay",
          desc: "Pay your bills !",
          image: require("../assets/images/smartphone.png")
     },
     {
          id: "histories",
          name: "Histories",
          screen: "History",
          desc: "Check all your transactions !",
          image: require("../assets/images/history.png")
     },
     {
          id: "charges",
          name: "Charges",
          screen: "Charge",
          desc: "Charge money to your account !",
          image: require("../assets/images/charge.png")
     },
];

const transfer_type = [
     {
          id: "transfers",
          name: "Send",
          screen: "Send",
          desc: "Send money !",
          image: require("../assets/images/send.png")
     },
     {
          id: "valid",
          name: "Receive",
          screen: "Receive",
          desc: "Receive money !",
          image: require("../assets/images/pay.png")
     },
];

const pay_type = [
     {
          id: "meth1",
          name: "Methode 1",
          screen: "none",
          desc: "Pay your bills !",
          image: require("../assets/images/none.png")
     },
     {
          id: "meth2",
          name: "Methode 2",
          screen: "None",
          desc: "Pay your bills !",
          image: require("../assets/images/none.png")
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

let profile = {

};

export { categories, explore, products, profile, transfer_type, pay_type };
