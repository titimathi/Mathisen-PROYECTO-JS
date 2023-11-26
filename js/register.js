const usuarios = [
    {
        usuario: 1,
        nombre: "Cintia ",
        mail: "cintiamathisen@mail.com",
        contraseña: "123456",
        },
    {
        usuario: 1,
        nombre: "francisco",
        mail:"francisco@mail.com" ,
        contraseña:"123456",
        },
    {
        usuario: 1,
        nombre: "Delfina",
        mail:"delfinaA@mail.com" ,
        contraseña:"123456",
        },
    {
        usuario: 1,
        nombre: "Wenseslao",
        mail:"wenseslao@mail.com" ,
        contraseña:"123456",
    }
]


const singUpForm = document.querySelector("#singUpForm");
  
singUpForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const nombreUsuario = document.querySelector("#nombre").value;
    const emailUsuario = document.querySelector("#email").value;
    const contraseñaUsuario = document.querySelector("#contraseña").value;
    

    const users = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Check if the email is already registered
    const userExists = users.find(usuarios => usuarios.email === emailUsuario)

    if (userExists) {
        return alert("El usuario ya está registrado")
    }

    
    users.push({nombre: nombreUsuario, email: emailUsuario,contraseña:contraseñaUsuario})



    localStorage.setItem("usuarios", JSON.stringify(users))

    alert("Registro exitoso");
    window.location.href = "./login.html";
  
});


