<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>بخورات خلیجی | رایحه اصیل</title>
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Vazirmatn', sans-serif;
      background-color: #f8f5f0;
      color: #3a2e2e;
      margin: 0;
      padding: 0;
      direction: rtl;
    }
    header {
      background: linear-gradient(135deg, #a67c52, #5e412f);
      padding: 30px;
      text-align: center;
      color: #fff;
    }
    header h1 {
      margin: 0;
      font-size: 2.5em;
    }
    nav {
      background-color: #3a2e2e;
      display: flex;
      justify-content: center;
      gap: 20px;
      padding: 10px;
    }
    nav a {
      color: #f8f5f0;
      text-decoration: none;
      font-weight: bold;
    }
    .hero {
      text-align: center;
      padding: 60px 20px;
      background: url('https://images.unsplash.com/photo-1602506435077-3aa9277b3db4') no-repeat center center/cover;
      color: white;
    }
    .hero h2 {
      font-size: 2em;
      background-color: rgba(0,0,0,0.5);
      display: inline-block;
      padding: 10px 20px;
      border-radius: 10px;
    }
    .section {
      padding: 40px 20px;
      text-align: center;
    }
    .section h2 {
      color: #5e412f;
      margin-bottom: 15px;
    }
    .products {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 25px;
      margin-top: 30px;
    }
    .product {
      background-color: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .product:hover {
      transform: scale(1.03);
    }
    .product img {
      max-width: 100%;
      border-radius: 10px;
    }
    .product h3 {
      margin: 10px 0 5px;
      font-size: 1.2em;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      background-color: #5e412f;
      color: white;
      padding: 12px 25px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
    }
    footer {
      background-color: #3a2e2e;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 50px;
    }
    footer a {
      color: #fff;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <header>
    <h1>بخورات خلیجی</h1>
    <p>رایحه‌ای ماندگار از اصالت شرقی</p>
  </header>

  <nav>
    <a href="#about">درباره ما</a>
    <a href="#products">محصولات</a>
    <a href="#contact">سفارش</a>
  </nav>

  <div class="hero">
    <h2>با هر بسته، آرامش و شکوه را به خانه بیاورید</h2>
  </div>

  <div id="about" class="section">
    <h2>درباره فروشگاه ما</h2>
    <p>در بخورات خلیجی، رایحه‌هایی برگرفته از فرهنگ غنی خاورمیانه را گردآوری کرده‌ایم. محصولات ما شامل عود مروکی اصل، صمغ‌های طبیعی، بخورهای ترکیبی عروسی و مجموعه‌های ویژه مهمانی هستند.</p>
  </div>

  <div id="products" class="section">
    <h2>محصولات محبوب</h2>
    <div class="products">
      <div class="product">
        <img src="https://via.placeholder.com/250x180" alt="بخور سلطانی">
        <h3>بخور سلطانی</h3>
        <p>رایحه‌ای گرم از عنبر، مشک و گل‌های شرقی</p>
      </div>
      <div class="product">
        <img src="https://via.placeholder.com/250x180" alt="عود مروکی">
        <h3>عود مروکی تایلندی</h3>
        <p>عود خالص با ماندگاری بالا - مخصوص مراسم خاص</p>
      </div>
      <div class="product">
        <img src="https://via.placeholder.com/250x180" alt="بخور عروسی">
        <h3>بخور عروسی</h3>
        <p>ترکیبی شیرین و دل‌نشین، مخصوص شب‌های به‌یادماندنی</p>
      </div>
    </div>
    <a class="btn" href="https://wa.me/989XXXXXXXXX">سفارش از واتساپ</a>
  </div>

  <div id="contact" class="section">
    <h2>ارتباط با ما</h2>
    <p>برای سفارش، مشاوره یا دریافت لیست قیمت‌ها با ما در تماس باشید:</p>
    <a class="btn" href="https://wa.me/989XXXXXXXXX">واتساپ</a>
    <br><br>
    <a class="btn" href="https://instagram.com/yourpage">صفحه اینستاگرام</a>
  </div>

  <footer>
    <p>تمامی حقوق این سایت متعلق به بخورات خلیجی است © 2025 | طراحی با ❤️</p>
  </footer>

</body>
</html>
