import React, { useState, useEffect } from "react";
import './App.css';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios'




function App() {

  const [Ami, setami] = useState('');
  const [TipoInst, setTI] = useState('');
  const [nInst, setNI] = useState(0);
  const [Subnets, setSub] = useState('');
  const [publicIP, setIP] = useState('');
  const [Size, setSize] = useState('');
  const [volumeTypes, setVolT] = useState('');
  const [SCname, setScName] = useState('');
  const [SCDesc, setDesc] = useState('');
  const [DeleteonTermination, setDel] = useState(false);
  const [tags, setTags] = useState([]);
  const [idVpc, setVpc] = useState(0);
  const [ListaVpc, setLVpc] = useState([]);


  // const efetuarCadastro  

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  // const mostrar = () => {
  //   console.log(tags)
  //   console.log(DeleteonTermination)
  // }

  const atualizarLista = () => {
    axios('http://localhost:5000/api/Vpcs').then(
      r => {
        setLVpc(r.data)
        console.log(ListaVpc)
      }
    )
      .catch(erro => console.log(erro))
  }

  const efetuarCadastro = (event) => {
    event.preventDefault()



    let ec2 = {
      idVpc: idVpc,
      ami: Ami,
      instanceType: TipoInst,
      numberInstances: nInst,
      subnet: Subnets,
      publicIp: publicIP,
      size: Size,
      volumeType: volumeTypes,
      deleteTermination: DeleteonTermination,
      securityGroupName: SCname,
      securityDescription: SCDesc,
      // tags: tags

    }



    console.log(ec2)
    console.log(idVpc)

    fetch('http://localhost:5000/api/Ec2', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ec2),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setDesc('')
        setami('')
        setIP('')
        setNI('')
        setScName('')
        setSize('')
        setSub('')
        setTI('')
        setVolT('')
        setVpc(0)
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const changeCheckBox = () => {
    if (DeleteonTermination === false) {
      setDel(true)
    } else {
      setDel(false)
    }

  }



  // useEffect(mostrar, [])
  useEffect(atualizarLista, [])

  // useEffect(console.log(valor), [])

  return (
    <div className="App">
      <header className="App-header">
        <div className="Bloco_Ec2">

          <form onSubmit={efetuarCadastro}>
            <h1>Ec2</h1>
            <div className="container_Label">
              <label>Vpc</label>
            </div>

            <select value={idVpc} onChange={(campo) => setVpc(campo.target.value)} name="Vpc" id="sel_VPC">
              <option value="0">Selecione uma VPC</option>
              {
                
                ListaVpc.map((Vpc) => { 
                  
                  return (
                    <option value={Vpc.idVpc} key={Vpc.idVpc}>{Vpc.nametag}</option>
                  )
                })
              }
            </select>
            <div className="container_Label">
              <label>Ami</label>
            </div>

            <input
              value={Ami}
              onChange={(e) => setami(e.target.value)}
            />

            <div className="container_Label">
              <label>Tipo de Instancia</label>
            </div>
            <input

              value={TipoInst}
              onChange={(e) => setTI(e.target.value)}
            />

            <div className="container_Label">
              <label>Numero de Instacias</label>
            </div>
            <input
              type='number'
              min="1"
              maxLength="100"
              className="inuputNI"
              value={nInst}
              onChange={(e) => setNI(e.target.value)}
            />

            <div className="container_Label">
              <label>Subnet</label>
            </div>
            <input
              value={Subnets}
              onChange={(e) => setSub(e.target.value)}

            />

            <div className="container_Label">
              <label>Ip Publico</label>
            </div>
            <input
              value={publicIP}
              onChange={(e) => setIP(e.target.value)}
            />

            <div className='container_Stora'>
              <h2>Armazenamento</h2>
            </div>

            <div className="container_Label">
              <label>Tamanho</label>
            </div>

            <div className="container_size" >
              <input
                type='number'
                className="inuputGB"
                id="InputGB" step='1'
                min="1"
                max="100"
                value={Size}
                onChange={(e) => setSize(e.target.value)}
              />
              <span>Gb</span>
            </div>

            <div className="container_Label">
              <label>Volume Type</label>
            </div>
            <input
              value={volumeTypes}
              onChange={(e) => setVolT(e.target.value)}
            />

            <div className="container_Label2">
              <label className="delete">Deletar Memoria apos a destruição?</label>
              <label class="switch">
                <input
                  type="checkbox"
                  //  value={DeleteonTermination}
                  //  onKeyDown={setDel(false)}
                  //  



                  onChange={changeCheckBox}
                // checked={true}
                //  onChange={(e) => console.log(e.target.value)}
                />
                <span class="slider round"></span>
              </label>
            </div>




            {/* <input 
            type="radio"
            value={DeleteonTermination}
            onChange={(e) => setDel(e.target.value)}
            /> */}
            <div className="container_Label">
              <label>Tags</label>
            </div>
            <div>

              <ReactTags
                tags={tags}
                inline
                placeholder="Adcione uma tag"
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete


              />
            </div>
            {/* <div className="Constainer_tag">
              <div>                
                <input className="inputKey" />
              </div>
              <span> : </span>
              <div>
                <input className="inputKey" />
              </div>


            </div> */}
            <div className="container_Label">
              <label>Security group name</label>
            </div>
            <input
              value={SCname}
              onChange={(e) => setScName(e.target.value)}
            />
            <div className="container_Label">
              <label>Description</label>
            </div>
            <input

              value={SCDesc}
              onChange={(e) => setDesc(e.target.value)}
            />

            {/* <input
              type="submit"
              value="Enviar"

              className="Inputdoleal"
            /> */}

            <button type="submit" className="inputdoleal" >Enviar</button>


          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
