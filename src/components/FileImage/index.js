import React from 'react'

// barra de progresso circular
import {CircularProgressbar} from 'react-circular-progressbar'
import {MdCheckCircle, MdError, MdLink} from 'react-icons/md'

import {Container, FileInfo, Preview} from './styles'

const FileList = ({ file, onDelete }) => {

    return (
    <Container>
        
        <li>
            <FileInfo >
                <Preview src={file.preview}/>
                <div>

                    <strong>{file.name}</strong>
                    <span>
                        {file.readableSize}
                        {!!file.url && (
                            <button onClick={()=> onDelete(file.id)}>Excluir</button>
                        )}
                    </span>
                </div>
            </FileInfo >
            <div>
                {!file.uploaded && !file.error && (
                    <CircularProgressbar
                    styles={{
                        root: {width: 24},
                        path: {stroke: "#0078f2"},
                    }}
                    strokeWidth={10}
                    value={25}
                />
                )}

                {file.url && (
                    <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MdLink style={{marginRight: 8}} size={24} color="#222" />
                </a>
                )}
                    
                {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                {file.error && <MdError size={24} color="#e57878" />}
            </div>
        </li>
        
    </Container>
    )
}

export default FileList