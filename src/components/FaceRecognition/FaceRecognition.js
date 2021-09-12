import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({box, imageUrl}) => {
    return (
        <div className='center ma'>
            <div className='relative mt4'>
                {
                    !imageUrl ?
                    <h2 className='white normal'>Image will be displayed here!</h2> :
                    <div>
                        <img id='inputimage' className='ba bw2' src={imageUrl} alt='face detection' width='500px' height='auto'/>
                        {
                            box.map((face, i) => {
                                return <div key={i} className='bounding-box' style={{top: box[i].topRow, right: box[i].rightCol, bottom: box[i].bottomRow, left: box[i].leftCol}}></div>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default FaceRecognition;