module.exports = ({ content }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Include the layout.js file to create the layout template -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  </head>
  <body>
  <nav class="navbar navbar-expand-lg bg-body-tertiary mb-5" data-bs-theme="dark">
    <div class="container-fluid">
      <div class="px-5">
      <a class="navbar-brand" href="#"><i class="fa-solid fa-phone-flip"></i>+1 555 987 6543</a>
      <a class="navbar-brand" href="#"><i class="fa-solid fa-envelope"></i>shop@myshop.com</a>
      </div>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav px-5">
      <li class="nav-item">
        <a class="nav-link text-white fs-5 m-1" href="/"><i class="fa-brands fa-facebook"></i></a>
      </li>
      <li class="nav-item">
      <a class="nav-link text-white fs-5 m-1" href="/"><i class="fa-brands fa-twitter"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white fs-5 m-1" href="/"><i class="fa-brands fa-linkedin"></i></a>
      </li>
    </ul>
  </div>
  </nav>
    <div class="container">
   ${content}
   </div>
    <script src="https://kit.fontawesome.com/c03d196568.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
   <script src="/app.js"></script>
  </body>
  </html>
  
    `;
};
