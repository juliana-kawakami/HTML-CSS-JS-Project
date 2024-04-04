// objeto javascript
let participantes = [
  {
    nome: "Maryk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Yuri Pires",
    email: "ypires@gmail.com",
    dataInscricao: new Date(2024, 3, 12, 17, 50),
    dataCheckIn: new Date(2024, 7, 10, 20, 1)
  },
  // Adicionando mais participantes
  {
    nome: "João Silva",
    email: "joaosilva@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 10, 30),
    dataCheckIn: new Date(2024, 0, 10, 15, 45)
  },
  {
    nome: "Ana Souza",
    email: "anasouza@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 14, 20),
    dataCheckIn: null
  },
  {
    nome: "Carlos Ferreira",
    email: "carlosf@gmail.com",
    dataInscricao: new Date(2024, 4, 8, 12, 0),
    dataCheckIn: new Date(2024, 4, 15, 16, 30)
  },
  {
    nome: "Mariana Oliveira",
    email: "marianaoliveira@gmail.com",
    dataInscricao: new Date(2024, 6, 20, 9, 45),
    dataCheckIn: new Date(2024, 6, 25, 14, 15)
  },
  {
    nome: "Pedro Santos",
    email: "pedrosantos@gmail.com",
    dataInscricao: new Date(2024, 8, 2, 18, 10),
    dataCheckIn: new Date(2024, 8, 7, 22, 30)
  },
  {
    nome: "Luiza Oliveira",
    email: "luizaoliveira@gmail.com",
    dataInscricao: new Date(2024, 9, 10, 20, 20),
    dataCheckIn: null
  },
  {
    nome: "Rafael Lima",
    email: "rafaellima@gmail.com",
    dataInscricao: new Date(2024, 10, 18, 15, 0),
    dataCheckIn: new Date(2024, 10, 23, 19, 45)
  },
  {
    nome: "Sara Vieira",
    email: "saravieira@gmail.com",
    dataInscricao: new Date(2024, 11, 5, 11, 30),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
    <button 
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)">
      Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  //loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  //substituir informacao do html
  document
  .querySelector('tbody')
  .innerHTML = output
} // arrow function

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante ja existe
  const participanteExiste = participantes.find((p) => p.email == participante.email
  )

if (participanteExiste){
  alert('Email já cadastrado!')
  return
}

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar que o participante quer fazer check in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check in?'

  if (confirm(mensagemConfirmacao) == false){
    return 
  }

  //encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}

