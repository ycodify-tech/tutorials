import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

// tenantID, apiMasterKey e url base que estão presentes na plataforma Ycodify
// OBS: essas variáveis podem ser definidas em um arquivo separado 
// (.env por exemplo) e recuperadas aqui.
const tenantID = ''
const apiMasterKey = ''
const yclBaseDir = "https://api.ycodify.com/v2/persistence/" 

const yclHeaders = {
      'Content-Type': 'application/json',
      'X-Tenant-ID': tenantID,
      'X-API-Master-Key': apiMasterKey,
    }
// headers definidos dessa forma para facilitar a clareza da requisição
// utilizando axios
const axiosConfig = {
    "headers": yclHeaders
    }

function App() {
  // aqui pode-se tipar o seu estado para o uso dos dados. 
  // Neste caso, é necessário adicionar os atributos da entidade
  // que se deseja trabalhar
  type yourDataType = {
    id: string;
    nome: string;
    idade: string;
  }
  // definição do estado que recebe os valores inseridos no formulário
  const [dataForm, setDataForm] = useState<yourDataType>({
    id: "",
    nome: "",
    idade: "",
  });
  // função auxiliar para edição dos campos do formulário
  const handleChange = (e: any) => {
    const {id, value} = e.target
    setDataForm({...dataForm, [id]: value})
  }

  // função base para a criação/inserção de informações na entidade desejada
  function createData() {
    const creatYclURL = yclBaseDir + "c/s/no-ac";
    const query = {
    "action": "CREATE",
      "data": [
        {
          // não esqueça de difinir aqui o nome da entidade.
          // Ex: "aluno": dataForm
          "": dataForm
        }
      ]
    }
    // requisição utilizando axios
    axios.post(creatYclURL, query, axiosConfig)
      .then((response) => {
        // aqui se pode definir o tratamento de erros ou as respostas
        // desejadas
        console.log(response);
      });
  }

  // função base para a leitura de informações na entidade desejada
  function readData() {
    const readYclURL = yclBaseDir + "q/s/no-ac";
    const query = [
        {
          // não esqueça de difinir aqui o nome da entidade.
          // Ex: "aluno": dataForm
          "": dataForm
        }
    ]
    // requisição utilizando axios
    axios.post(readYclURL, query, axiosConfig)
      .then((response) => {
        // aqui se pode definir o tratamento de erros ou as respostas
        // desejadas
        console.log(response);
      });
  }

  // função base para a atualização de informações na entidade desejada
  function updateData() {
    const updateYclURL = yclBaseDir + "c/s/no-ac";
    const query = {
    "action": "UPDATE",
      "data": [
        {
          // não esqueça de difinir aqui o nome da entidade.
          // Ex: "aluno": dataForm
          "": dataForm
        }
      ]
    }
    // requisição utilizando axios
    axios.post(updateYclURL, query, axiosConfig)
      .then((response) => {
        // aqui se pode definir o tratamento de erros ou as respostas
        // desejadas
        console.log(response);
      });
  }

  // função base para a remoção de informações na entidade desejada
  function deleteData() {
    const deleteYclURL = yclBaseDir + "c/s/no-ac";
    const query = {
    "action": "DELETE",
      "data": [
        {
          // não esqueça de difinir aqui o nome da entidade.
          // Ex: "aluno": dataForm
          "": dataForm
        }
      ]
    }
    // requisição utilizando axios
    axios.post(deleteYclURL, query, axiosConfig)
      .then((response) => {
        // aqui se pode definir o tratamento de erros ou as respostas
        // desejadas
        console.log(response);
      });
  }


  return (
    <div className="App">
      <h2>
        Tutorial 02/Example 01 <small style={{fontSize: "14px"}}>Usando React e TypeScript </small>
      </h2>
      <p>
        O código escrito nesse repositório tem por objetivo auxiliar a compreensão do uso da API de Ycodify. Nele, usamos React, TypeScript e axios para requisições HTTP para a API.
      </p>
    Funcionalmente, o que segue é a codificação de operações CRUD, tendo por base uma entidade genérica tipada (descrita em conformidade com a linguagem YCL):
    <pre>{`entity yourDataType {
        id
          nome
            idade 
      }`}
    </pre>
    <form className="data-form">
      <div className="form-div">
      <label> id </label>
      <input id="id" placeholder="id" onChange={handleChange}/>
      <label> nome </label>
        <input id="nome" placeholder="nome" onChange={handleChange}/>
      <label> idade </label>
        <input id="idade" placeholder="idade" onChange={handleChange}/>
    <button id="create" onClick={createData}>criar</button>
    <button id="read" onClick={readData}>ler</button>
    <button id="update" onClick={updateData}>atulizar</button>
    <button id="delete" onClick={deleteData}>apagar</button>
    </div>
    </form>
  </div>
  );
}

export default App;
