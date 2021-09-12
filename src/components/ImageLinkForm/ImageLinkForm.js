import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ input, onInputChange, onDetect }) => {
    return (
        <div>
            <p className='f3 white'>{'This Magic Brain will detect faces in your pictures. Give it a try!'}</p>
            <div className='center'>
                <div className='back center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' value={input} onChange={onInputChange}/>
                    <button className='w-30 grow f4 ph3 pv2 link dib white' onClick={onDetect}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;