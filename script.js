display();
function login() {
  
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json"); 

    var raw = {
      username : username,
      password : password
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    fetch("https://tarmeezacademy.com/api/v1/login", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        localStorage.setItem("token" , result.token );
        localStorage.setItem('user' , JSON.stringify(result.user));

        const modal = document.getElementById('exampleModal');
        const modalIns = bootstrap.Modal.getInstance(modal);
        modalIns.hide();
        success();
        display();
       

      })
      .catch(error => console.error('Error:', error));
  }

  function success() {

    var successModal = new bootstrap.Modal(document.getElementById('successModal'), {
      keyboard: false,
      backdrop: 'static'
    });
    
    successModal.show();
  }

function display() {
  const token = localStorage.getItem('token');
  
  const loginBtn = document.getElementById('loginBtn');
  const logOut = document.getElementById('logOut');

  if (token == null) {
    logOut.style.display = 'none';
    loginBtn.style.display = 'block';
  }else{
    loginBtn.style.display = 'none';
    logOut.style.display = 'block';


  }
  
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  display();

  
}

    
