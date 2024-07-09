async function main() {
  const inputFiles = document.querySelector("#inputFiles");
  const slider1Img = document.querySelectorAll(".slider1Img");
  const submitDoc = document.querySelectorAll(".submitDoc");
  const type_main = document.querySelector("#type");
  const title_main = document.querySelector("#title");
  const hashTag_main = document.querySelector("#hashTag");
  const from_main = document.querySelector("#from");
  const desc_main = document.querySelector("#desc");
  const pageLink_main = document.querySelector("#pageLink");
  const homePageLastSectApiMode_main = document.querySelector(
    "#homePageLastSectApiMode"
  );
  const login = document.querySelector(".login");
  const loading = document.querySelector(".loading");

  let pass;
  let access;
  let isLogin = false;
  let mainApi = "./server.php?pass=";
  async function submit() {
    mainApi = "./server.php?pass=" + pass;
    await fetch("./myIp.php");
    loading.classList.add("active");
    access = await (await fetch(mainApi)).text();
    if (access.includes("unSuccess")) return (document.location = "404");
    else {
      login.parentElement.remove();
      localStorage.setItem("pass", pass);
      loading.classList.remove("active");
      isLogin = true;
    }
  }
  login.addEventListener("submit", async (e) => {
    e.preventDefault();
    pass = document.querySelector("#user_pass").value;
    await submit();
  });

  if (localStorage.getItem("pass")) {
    pass = localStorage.getItem("pass");
    submit();
  }
  setTimeout(() => {
    if (!access) login.submit();
  }, 10000);
  inputFiles.addEventListener("change", () => {
    slider1Img.forEach((item) => {
      item.src = URL.createObjectURL(inputFiles.files[0]);
    });
  });

  submitDoc.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.parentElement.querySelector(".title");
      const hashTag = item.parentElement.querySelector(".hashTag");

      type_main.value = encodeURIComponent(item.value);
      title_main.value = encodeURIComponent(title.value);
      hashTag_main.value = encodeURIComponent(hashTag.value);
      pageLink_main;
      if (item.value === "homePageLastFetch") {
        const from = item.parentElement.querySelector(".from");
        const desc = item.parentElement.querySelector(".desc");
        const homePageLastSectApiMode = item.parentElement.querySelector(
          ".homePageLastSectApiMode"
        );
        from_main.value = encodeURIComponent(from.value);
        desc_main.value = encodeURIComponent(desc.value);
        homePageLastSectApiMode_main.value = encodeURIComponent(
          homePageLastSectApiMode.value
        );
      } else if (item.value === "searchResult") {
        const pageLink = item.parentElement.querySelector(".pageLink");
        pageLink_main.value = encodeURIComponent(pageLink.value);
      }
      loading.classList.add("active");
      $("#upload_image").submit();
    });
  });
  $("#upload_image").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url:
        mainApi +
        `&uploadPhoto&type=${type_main.value}&title=${
          title_main.value
        }&hashTag=${hashTag_main.value}&pageLink=${pageLink_main.value}&from=${
          from_main.value
        }&desc=${desc_main.value}&homePageLastSectApiMode=${
          homePageLastSectApiMode_main.value
        }&date=${new Date().toISOString()}`,
      method: "POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: async function (res) {
        console.log(
          mainApi +
            `&uploadPhoto&type=${type_main.value}&title=${
              title_main.value
            }&hashTag=${hashTag_main.value}&pageLink=${
              pageLink_main.value
            }&from=${from_main.value}&desc=${
              desc_main.value
            }&homePageLastSectApiMode=${
              homePageLastSectApiMode_main.value
            }&date=${new Date().toISOString()}`
        );
        if (!/typeError/g.test(res)) {
          loading.classList.remove("active");
        }
      },
      error: function (req, err) {
        console.log(err);
      },
    });
  });
  fetch("../site.php?json=seens")
    .then((res) => res.text())
    .then((val) => {
      if (isLogin)
        document.querySelector(".allRequets").textContent = `سین : ${val}`;
    });
  setInterval(() => {
    fetch("../site.php?json=seens")
      .then((res) => res.text())
      .then((val) => {
        if (isLogin)
          document.querySelector(".allRequets").textContent = `سین : ${val}`;
      });
  }, 5000);
}
main();
