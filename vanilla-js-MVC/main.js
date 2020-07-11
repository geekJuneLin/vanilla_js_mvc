import App from "./App.js";

const app = new App("#app");

app.addComponent({
  name: "dog",
  model: {
    dogs: [],
  },
  view(model) {
    console.log(model.length);
    return ` 
    <div class='container'>
      <div class='row' style='column-count:3;'>
        ${model.dogs
          .map(
            (element) => `
          <div class="col-lg-3 col-md-4 col-xs-6 thumb">
            <img class="img-thumbnail" style="width:100%;" src="${element.urls.full}"/>
          </div>
          `
          )
          .join("")}
      </div>
    </div>
    `;
  },
  controller(model) {
    fetch("https://api.unsplash.com/photos/?client_id=API_KEY")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((element) => {
          model.dogs.push(element);
        });
        app.updateView();
      });
  },
});

app.showComponent("dog");
