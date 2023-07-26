const url = "/admin/products";
const fileFormDOM = document.querySelector("#productForm");
const productEditForm = document.querySelector("#productEditForm");
const nameInputDOM = document.querySelector("#name");
const priceInputDOM = document.querySelector("#price");
const imageInputDOM = document.querySelector("#imageInput");

let imageValue;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })

imageInputDOM?.addEventListener("change", async (e) => {
  console.log("changed");
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const {
      data: {
        image: { src },
      },
    } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    imageValue = src;
  } catch (error) {
    imageValue = null;
    console.log(error);
  }
});

fileFormDOM?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;
  try {
    const product = { name: nameValue, price: priceValue, image: imageValue };

    const res = await axios.post(`${url}/new`, product);
    if (res.data.success) {
      window.location.href = "/admin/products";
      fileFormDOM.reset(); // Reset the entire form
    } else {
      document.body.innerHTML = res.data;
    }
  } catch (error) {
    console.log(error);
  }
});

productEditForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;

  // Extract the id from the URL
  const urlParts = window.location.pathname.split("/").filter(Boolean);
  const productId = urlParts[urlParts.length - 1];

  try {
    const product = { name: nameValue, price: priceValue, image: imageValue };

    const res = await axios.post(`${url}/edit/${productId}`, product);

    if (res.data.success) {
      window.location.href = "/admin/products";
      fileFormDOM.reset(); // Reset the entire form
    } else {
      document.body.innerHTML = res.data;
    }
  } catch (error) {
    console.log(error);
  }
});
