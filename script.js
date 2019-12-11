Vue.component("new-item", {
    data: function() {
    return {
      show: false,
      instName: "",
      instType: "",
      instPrice: "",
      instBrand: "",
      instImage: "http://view.dreamstalk.ca/breeze5/images/no-photo.png"
    };
    },
  template: '<div><button class="cart" v-on:click="showForm">Add new item to inventory</button><div class="overlay" v-bind:class="{hide:!show}"><p class="overText">Name:<input type="text" v-model="instName">Type:<input type="text" v-model="instType">Price:<input type="text" v-model="instPrice"></br>Brand:<input type="radio" id="yamaha" value="yamaha" v-model="instBrand"><label for="yamaha">Yamaha</label><input type="radio" id="fender" value="fender" v-model="instBrand"><label for="fender">Fender</label><input type="radio" id="maton" value="maton" v-model="instBrand"><label for="maton">Maton</label></br>Image Link:<input type="text" v-model="instImage"></br><button v-on:click="addInst">Submit</button></p></div></div>',
  methods:{
    showForm: function() {
      this.show = !this.show;
    },
    addInst: function(event){
      this.$emit('clicky',[this.instName,this.instPrice,this.instType,this.instBrand,this.instImage]);
      this.instName= "";
      this.instType= "";
      this.instPrice= "";
      this.instBrand= "";
      this.instImage= "";
      this.show = !this.show;
    }}
});

Vue.component("cart", {
  props: ["name"],
  template: '<div class="cart">{{name}}</div>'
})

Vue.component("instrument", {
  data: function() {
    return {
      show: false,
    };
  },
  props: [ "index","name", "type", "price", "brand", "image","add-cart"],
  template:
    '<div><div v-on:click="toggleShow"><div class="overlay" v-bind:class="{hide:!show}"><p class="overText">{{name}}</br>{{type}}</br>${{price}}</br>{{brand}}</br><button  v-on:click="moveToCart">Add {{name}} to Cart</button></p></div></div><div v-on:click="toggleShow"><div v-bind:class="{hide:show}"><h3>{{name}}</h3><img v-bind:src=image  v-bind:class=brand.toLowerCase()></img></br><button  v-on:click="moveToCart">Add {{name}} to Cart</button></div></div>' ,
  methods: {
    toggleShow: function() {
      this.show = !this.show;
    },
    moveToCart: function(event) {
      this.$emit('clicked',this.index)
    }
    
  }
});

var app = new Vue({
  el: "#instStore-app",
  data: {
    message: "Welcome to the Instrument Store",
    cartArray: [],
    instArray: [
      {
        name: "Rhodes Mark I",
        type: "piano",
        price: 1400,
        brand: "Fender",
        image:
          "https://images.reverb.com/image/upload/s--dcFcjd3H--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1446511301/ye0thu8yliygqawmlms8.jpg"
      },
      {
      name: "Stratocaster",
        type: "guitar",
        price: 674.99,
        brand: "Fender",
        image:
          "https://media.sweetwater.com/api/i/f-webp__q-82__ha-028744d801f91ce4__hmac-be433de1a2830c3fefeaa166369b23905475b0f2/images/closeup/750-StratPMBLK_front.jpg.auto.webp"
      },
      {
        name: "EML6",
        type: "guitar",
        price: 1247,
        brand: "Maton",
        image:
          "https://cdn9.bigcommerce.com/s-ikl27/products/12454/images/414382/381882__07383__94559__35739__64841.1506409073.1280.1280.gif?c=2"
      },
      {
        name: "P25F Pianica",
        type: "Pianica",
        price: 56.99,
        brand: "Yamaha",
        image:
          "https://az58332.vo.msecnd.net/e88dd2e9fff747f090c792316c22131c/Images/Products23071-635x575-993071.jpg"
      },
      {
        name: "PSR-170 61 Key Portable",
        type: "keyboard",
        price: 1200,
        brand: "Yamaha",
        image:
          "https://images.equipboard.com/uploads/item/image/32654/yamaha-fx335-acoustic-electric-guitar-xl.jpg?v=1549918029"
      },
      {
        name: "SRS808 Acoustic",
        type: "guitar",
        price: 1479.79,
        brand: "Maton",
        image:
          "https://andertons-productimages.imgix.net/130284-IMG_3581.JPG?w=720&h=720&fit=fill&bg=FFFFFF&auto=format&ixlib=imgixjs-3.3.2"
      },
      {
        name: "Yamaha SLG200S Silent Guitar",
        type: "guitar",
        price: 699.99,
        brand: "Yamaha",
        image:
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRHrySWRjMQtDCf4SuE1cd2WWF8Pvc9-FVAf-v0LpFm-lHdqhm-7rbUgKIOXj5Y_TGJpnRUYLgUjStmC-bj704IauzEMKQw66pBh7RonYa4&usqp=CAY"
      },{
        name: "Maton BB1200 JH",
        type: "guitar",
        price: 2999.00,
        brand: "Maton",
        image:
          "https://images.reverb.com/image/upload/s--FtqeGCg9--/f_auto,t_large/v1570574822/i1zzu5tpxvcwukt23ya9.jpg"
      },
      {
        name: "Telecaster",
        type: "guitar",
        price: 499.99,
        brand: "Fender",
        image:
          "https://stuff.fendergarage.com/images/1/Y/z/taxonomy-electric-guitar-telecaster-american-professional-car@2x.png"
      }
    ]
  },
  methods: {
    cartNumb: function() {
      return this.cartArray.length;
    },

    addToCart: function(value) {
        
          this.cartArray.push({
         name:this.instArray[value].name,
         type:this.instArray[value].type,
         price:this.instArray[value].price,
         brand:this.instArray[value].brand,
         image:this.instArray[value].image
      })
      this.instArray.splice(value,1);
    },
    addToInv: function(value) {
      this.instArray.push({
         name:value[0],
         type:value[1],
         price:value[2],
         brand:value[3],
         image:value[4]
      })
    },
    
    emptyCart: function() {
    for (i=0;i<this.cartArray.length;i=i){
    this.instArray.push({
         name:this.cartArray[0].name,
         type:this.cartArray[0].type,
         price:this.cartArray[0].price,
         brand:this.cartArray[0].brand,
         image:this.cartArray[0].image
      })
      this.cartArray.splice(0,1);
    }}},
    computed:{
      storeNumb: function() {
      return this.instArray.length
    }},
    watch:{
      storeNumb: function(){
        if (this.storeNumb==0){
          this.message="The store is empty"
        }
        else{
          this.message="Welcome to the Store"
        }
      }
    }
    
    
  }
);