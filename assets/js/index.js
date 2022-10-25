import { Leon, Lobo, Oso, Serpiente, Aguila } from "./Class/Especie.js";

let animales = [];

$("#btnRegistrar").on("click", () => {
  let especie = $("#animal").val();
  let edad = $("#edad").val();
  let comentarios = $("#comentarios").val();
  let preview = $("#preview").css(`background-image`);
  let imgPreview = preview.slice(5, preview.length - 2);

  const valorAnimal = especie;
  const fullAnimal = {
    Leon: new Leon(especie, edad, imgPreview, comentarios),
    Lobo: new Lobo(especie, edad, imgPreview, comentarios),
    Oso: new Oso(especie, edad, imgPreview, comentarios),
    Serpiente: new Serpiente(especie, edad, imgPreview, comentarios),
    Aguila: new Aguila(especie, edad, imgPreview, comentarios),
  };

  let nuevoAnimal = fullAnimal[valorAnimal];

  if (especie && edad && comentarios) {
    animales.push(nuevoAnimal);
    investigation();
    $("#animal").val("0");
    $("#edad").val("0");
    $("#comentarios").val("");
    $("#preview").css(`background-image`, `url('/assets/img/lion.svg')`);
  } else {
    alert("Es necesario agregar todos los datos antes de agregar un animal!");
  }
});

const investigation = () => {
  let animalCuadro = $("#Animales");
  animalCuadro.html("");
  let var2 = "";

  animales.forEach((p, i) => {
    var2 += `<div class="card mx-3" style="width: 10rem;">
        <img  data-toggle="modal" data-target="#exampleModal${i}" src="${p.getImg()}" class="card-img-top" alt="${p.getNombre()}">
          <div onclick="activarSonido('${i}')" class="card-body text-white bg-secondary py-1">
            <i class="fas fa-volume-up fa-2x"></i>
          </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal${i}">
      <div class="modal-dialog modal-dialog-centered w-25" role="document">
        <div class="modal-content bg-dark">
          <div class="modal-body">
            <img style="height: 600px" src="${p.getImg()}" class="card-img-top" alt="${p.getNombre()}"/>
            <div class="card-body text-white text-center">
              <p class="mb-0 font-weight-bold">${p.getEdad()}</p>
              <p class="mb-2 font-weight-bold">Comentarios</p>
              <hr class="my-0 bg-dark" />
              <p class="pt-3 px-3 card-text">${p.getComentarios()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  });

  animalCuadro.append(var2);
};

const sonidosAnimal = (e) => {
  let sonido = "";
  const animal = animales[e];
  if (animal.getNombre() == "Leon") {
    sonido = animal.rugir();
  } else if (animal.getNombre() == "Lobo") {
    sonido = animal.aullar();
  } else if (animal.getNombre() == "Oso") {
    sonido = animal.gruñir();
  } else if (animal.getNombre() == "Serpiente") {
    sonido = animal.sisear();
  } else {
    sonido = animal.chillar();
  }
  return sonido;
};

window.activarSonido = (i) => {
  const soundAnimal = sonidosAnimal(i);
  let player = $("#player").attr("src", soundAnimal);
  player.trigger("play");
};
