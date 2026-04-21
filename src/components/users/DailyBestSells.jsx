import React, { useRef, useEffect } from "react";

export default function DailyBestSells() {
  const base =
    typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    const slider = sliderRef.current;
    const card = slider.querySelector(".product-overlay-card, .banner-card");
    const width = card.offsetWidth + 16;

    slider.scrollBy({
      left: -width,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    const card = slider.querySelector(".product-overlay-card, .banner-card");
    const width = card.offsetWidth + 16;

    slider.scrollBy({
      left: width,
      behavior: "smooth",
    });

    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const products = [
    {
      img: `${base}/assets/images/category_essential_oil.png`,
      title: "Lemon Essential Oil",
      description: ["Natural astringent", "Anti-bacterial", "Anti dandruff"],
      rating: 4.5,
    },
    {
      img: `${base}/assets/images/category_lemon_powder.png`,
      title: "Lemon Powder Drink",
      description: ["Long shelf life", "Natural flavour", "Easy storage"],
      rating: 4.5,
    },
    {
      img: "https://minio.vitalimes.com/vitalimes-images/uploads/Black_lemon_dry.png",
      title: "Black Lemon",
      description: ["High antioxidant", "Natural smoky sourness"],
      rating: 4.5,
    },
    {
      img: `${base}/assets/new/Lemon_seed_powder.png`,
      title: "Lemon Seed Powder",
      description: ["Natural exfoliant", "Removes dead skin"],
      rating: 4.5,
    },
  ];

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const stars = [];

    for (let i = 0; i < full; i++)
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);

    if (half)
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);

    while (stars.length < 5)
      stars.push(
        <i key={"e" + stars.length} className="bi bi-star text-warning opacity-50"></i>
      );

    return stars;
  };

  return (
    <section style={{ marginTop: "4rem", marginBottom: "3rem" }}>
      <div className="container">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Daily Best Seller</h3>

          <div>
            <button
              className="btn btn-light me-2 shadow-sm rounded-circle"
              onClick={scrollLeft}
              style={{ width: 42, height: 42 }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              className="btn btn-light shadow-sm rounded-circle"
              onClick={scrollRight}
              style={{ width: 42, height: 42 }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="slider" ref={sliderRef}>

          {/* BANNER */}
          <div
            className="banner-card"
            style={{
              backgroundImage: `url(${base}/assets/images/Blacklemon_powder_2.png)`,
            }}
          >
            <div className="overlay-content">
              <h4>100% Pure Black Lemon Powder</h4>
              <p>Organic | Fresh | Premium Quality</p>

              <a href="/products" className="btn btn-success btn-sm">
                Shop Now
              </a>
            </div>
          </div>

          {/* PRODUCT CARDS */}
          {products.map((p, idx) => (
            <div
              key={idx}
              className="product-overlay-card"
              style={{ backgroundImage: `url(${p.img})` }}
            >
              <div className="overlay-content">

                <h5>{p.title}</h5>

                <ul>
                  {p.description.map((d, i) => (
                    <li key={i}>✔ {d}</li>
                  ))}
                </ul>

                <div className="rating">
                  {renderStars(p.rating)}
                  <span>{p.rating}</span>
                </div>

                <a href="/products" className="btn btn-success btn-sm mt-2">
                  Add to Cart
                </a>

              </div>
            </div>
          ))}
        </div>
      </div>

<style>{`

/* SLIDER */

.slider{
display:flex;
gap:16px;
overflow-x:auto;
scroll-snap-type:x mandatory;
scroll-behavior:smooth;
padding:0 10px;
}

.slider::-webkit-scrollbar{
display:none;
}

/* CARDS */

.banner-card{
flex:0 0 420px;
height:380px;
background-size:cover;
background-position:center;
border-radius:16px;
position:relative;
scroll-snap-align:start;
overflow:hidden;
}

.product-overlay-card{
flex:0 0 340px;
height:380px;
background-size:cover;
background-position:center;
border-radius:16px;
position:relative;
scroll-snap-align:start;
overflow:hidden;
transition:transform .3s ease;
}

.product-overlay-card:hover{
transform:scale(1.03);
}

/* OVERLAY */

.banner-card::before,
.product-overlay-card::before{
content:"";
position:absolute;
inset:0;
background:linear-gradient(
to top,
rgba(0,0,0,0.75),
rgba(0,0,0,0.15)
);
border-radius:16px;
}

/* CONTENT */

.overlay-content{
position:absolute;
bottom:20px;
left:20px;
right:20px;
color:white;
z-index:2;
}

.overlay-content h5,
.overlay-content h4{
font-weight:700;
margin-bottom:8px;
text-shadow:0 3px 8px rgba(0,0,0,.7);
}

.overlay-content ul{
list-style:none;
padding:0;
margin:6px 0;
font-size:14px;
}

.overlay-content li{
margin-bottom:3px;
}

.rating{
display:flex;
align-items:center;
gap:6px;
font-size:14px;
}

/* ---------- MOBILE ---------- */

@media(max-width:768px){

.slider{
padding:0 14px;
}

.banner-card{
flex:0 0 92%;
height:550px;
}

.product-overlay-card{
flex:0 0 90%;
height:550px;
}

.overlay-content h5{
font-size:16px;
}

.overlay-content ul{
font-size:13px;
}

}

/* EXTRA SMALL PHONES */

@media(max-width:420px){

.banner-card{
flex:0 0 94%;
height:380px;
}

.product-overlay-card{
flex:0 0 92%;
height:380px;
}

}

`}</style>

    </section>
  );
}