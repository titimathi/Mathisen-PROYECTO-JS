
const loguear = document.querySelector("#loguear");
loguear.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailUsuario = document.querySelector("#email").value;
    const contraseñaUsuario = document.querySelector("#contraseña").value;
    const users = JSON.parse(localStorage.getItem("usuarios")) || [];

    const userValid = users.find(usuarios => usuarios.email === emailUsuario && usuarios.contraseña === contraseñaUsuario);

    if (!userValid) {
        return alert("Usuario y/o contraseña incorrecta");
    }
    alert("a elergir donde gastar suela");
    window.location.href = "./index.html";
});
