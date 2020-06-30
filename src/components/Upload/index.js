import React from 'react'

import Dropzone from 'react-dropzone'

import {DropContainer, UploadMessage} from './styles'
import {MdAddAPhoto} from 'react-icons/md'

export default function Upload(props){

    const renderDragMessage = (isDragActive, isDragReject) => {
        
        // nao estiver arrastando nada
        if(!isDragActive){
            return <UploadMessage> {<MdAddAPhoto style={{width: 50}} />} </UploadMessage>
        }

        // arrastando um arquivo invalido
        if(isDragReject){
            return <UploadMessage type="error">Arquivo não surpotado</UploadMessage>
        }

        return <UploadMessage type="success">Solte a imagem aqui</UploadMessage>
    }

    return (

        // accept = image/* -> permitir upload todo tipo de imagem
        // onDropAccepted = ao fazer um novo upload
        <Dropzone accept="image/*" onDropAccepted={props.onUpload}>

            
            { ({getRootProps, getInputProps, isDragActive, isDragReject}) => (
            
            //Drop container vai ser nossa zona de arrastar arquivos, vamos ter que passar funçoes para ela 
            <DropContainer
                {...getRootProps()} // elemento no qual vai ter as propriedades de upload, vai adicionar as propriedades no DropContainer para que o usuario tenha a possibilidade de arrastar um arquivo para o elemento
                isDragActive={isDragActive} // Saber se quando estiver arrastando a imagem por cima do elemento vai estar true 
                isDragReject={isDragReject} // Quando estiver passando um arquivo que não seja imagem... faz isso baseado na propriedade accept False
            >
                
                <input {...getInputProps()} />

                {renderDragMessage(isDragActive, isDragReject)}

            </DropContainer>

            // os elemento de upload precisa ter um input, obrigatorio, vamos passar as propriedades do getInputProps para ele porem vai ser um input invisivel nesse caso

            )}

        </Dropzone>

    )
}