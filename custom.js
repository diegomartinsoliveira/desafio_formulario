function addCustomer(){
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("name").value;
    const telefone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;
    const logradouro = document.getElementById("address").value;
    const numero = document.getElementById("number").value;
    const bairro = document.getElementById("district").value;
    const cidade = document.getElementById("city").value;
    const estado = document.getElementById("uf").value;
    const password = document.getElementById("passwordInput").value;
    const confirmpassword = document.getElementById("passwordConfirm").value;
    const complement = document.getElementById("complement").value;
    const date = document.getElementById("date").value;
    const surname = document.getElementById("surname").value;
    const userphoto = document.getElementById("userphoto").value;
    const Radios = document.querySelector('input[name="Radios"]:checked').value;
    const checkbox = document.getElementById("Check1");
    
    const requiredInputs = [cpf, nome, telefone, email, cep, logradouro, numero, bairro, cidade, estado,
    password, confirmpassword, complement, date, surname, userphoto, Radios, checkbox.checked];
    const empty = requiredInputs.filter(valor => !valor);
    const avisoDiv = document.getElementById("aviso");
    const avisoSucess = document.getElementById("aviso-success");
    
        if (empty.length > 0) {
            avisoDiv.style.display = "block";
            avisoSucess.style.display = "none";
            avisoDiv.scrollIntoView({ behavior: "smooth" });
        } else {
            avisoDiv.style.display = "none";
            avisoSucess.style.display = "block";
            avisoSucess.scrollIntoView({ behavior: "smooth" });
    }
}

function limpa_formulário_cep() {
    document.getElementById('address').value=("");
    document.getElementById('district').value=("");
    document.getElementById('city').value=("");
    document.getElementById('uf').value=("");
}


function meu_callback(conteudo) {
    var element = document.getElementById('cep');
        if (!("erro" in conteudo)) {
            document.getElementById('address').value=(conteudo.logradouro);
            document.getElementById('district').value=(conteudo.bairro);
            document.getElementById('city').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
        }
        else {
            limpa_formulário_cep();
            element.classList.remove('is-valid');
            element.classList.add('is-invalid');
    }
}

function pesquisacep(valor) {
var cep = valor.replace(/\D/g, '');
var element  = document.getElementById('cep');

if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {
            document.getElementById('address').value="Buscando...";
            document.getElementById('district').value="Buscando...";
            document.getElementById('city').value="Buscando...";
            document.getElementById('uf').value="Buscando...";
            element.classList.remove('is-valid');
            element.classList.remove('is-invalid');

            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);

        }
            else {
                limpa_formulário_cep();
                element.classList.add('is-invalid');
                element.classList.remove('is-valid');
            }
        }
        else {
            limpa_formulário_cep();
    }
};

function inputMask(){

    new Cleave('#cpf', {
        blocks: [3, 3, 3, 2],
        delimiters: ['.', '.', '-',],
        numericOnly: true,
    });

    new Cleave('#cep', {
        blocks: [5, 3],
        delimiters: ['-',],
        numericOnly: true,
    });

    new Cleave('#uf', {
        blocks: [2], 
        uppercase: true,
    });

}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
  
    if (cpf.length !== 11) {
      return false;
    }
  
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
  
    return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
  }
  
function verifyCPF() {
    var cpfInput = document.getElementById("cpf");
    var cpf = cpfInput.value;

    if (validateCPF(cpf)) {
        cpfInput.classList.remove('is-invalid');
        cpfInput.classList.add('is-valid');
    } else {
        cpfInput.classList.remove('is-valid');
        cpfInput.classList.add('is-invalid');
    }
}


function telefone_validation(telefone) {
    telefone = telefone.replace(/\D/g, '');
    
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

    for (var n = 0; n < 10; n++) {
        if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
    }
    //DDDs validos
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    //verifica se o DDD é valido
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    return true;
}

function verifyPhone() {
    var telefoneInput = document.getElementById("phone");
    var telefone = telefoneInput.value;

    if (telefone_validation(telefone)) {
        telefoneInput.classList.remove('is-invalid');
        telefoneInput.classList.add('is-valid');
    } else {
        telefoneInput.classList.add('is-invalid');
        telefoneInput.classList.remove('is-valid');
    }
}

const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
}

function validateUF() {
    var inputUF = document.getElementById('uf');

    inputUF.addEventListener('keydown', function(event) {
        var teclaPressionada = event.key;
        var teclaMaiuscula = teclaPressionada.toUpperCase();
        if (/[0-9]/.test(teclaMaiuscula)) {
            // Impede a entrada de números
            event.preventDefault();
        }
    });
}

function showPassword() {
    var passwordInput = document.getElementById('passwordInput');
    var showPasswordIcon = document.getElementById('showPasswordIcon');
    var showPasswordIcon2 = document.getElementById('showPasswordIcon2');
  
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPasswordIcon.style.display = 'none';
      showPasswordIcon2.style.display = 'block';
    } else {
      passwordInput.type = 'password';
      showPasswordIcon2.style.display = 'none';
      showPasswordIcon.style.display = 'block';
    }
  }
  
  function showPasswordConfirm() {
    var passwordConfirm = document.getElementById('passwordConfirm');
  
    var showPasswordIconConfirm = document.getElementById('showPasswordIconConfirm');
    var showPasswordIcon2Confirm = document.getElementById('showPasswordIcon2Confirm');
  
    if (passwordConfirm.type === 'password') {
      passwordConfirm.type = 'text';
      showPasswordIconConfirm.style.display = 'none';
      showPasswordIcon2Confirm.style.display = 'block';
    } else {
      passwordConfirm.type = 'password';
      showPasswordIcon2Confirm.style.display = 'none';
      showPasswordIconConfirm.style.display = 'block';
    }

  }

  
  
  
