/*import React from 'react';
import MiniContenedor from './Minicontenedor';
import '../EstilosCss/Menu.css';




export const Menu = () => {
  return (
    <div className="App">
      <h1>Comienza con tus Finanzas:</h1>
      <div className="contenedor">
        <MiniContenedor imagenUrl="https://cdn-icons-png.flaticon.com/512/10106/10106041.png" linkTo="/Users" />
        <MiniContenedor imagenUrl="https://img.freepik.com/vector-gratis/concepto-bancarrota-diseno-dibujado-mano_23-2148500971.jpg?w=360" linkTo="/Users" />
        <MiniContenedor imagenUrl="https://img.freepik.com/vector-premium/dibujos-animados-informe-investigacion-auditoria_430232-68.jpg" linkTo="/Users" />
        <MiniContenedor imagenUrl="https://static.vecteezy.com/system/resources/previews/011/382/123/original/male-customer-service-agent-with-headsets-talking-via-video-call-using-cell-phone-3d-character-illustration-png.png" linkTo="/Users" />
      
      </div>
    </div>
  );
};*/

import React from 'react';
import MiniContenedor from './Minicontenedor';
import '../EstilosCss/Menu.css';

export const Menu = () => {
  return (
    <div className="App">
      <h1>Comienza con tus Finanzas:</h1>
      <div className="contenedor">
        <MiniContenedor 
          imagenUrl="https://cdn-icons-png.flaticon.com/512/10106/10106041.png" 
          linkTo="/Users" 
          texto="Ingresos" 
        />
        <MiniContenedor 
          imagenUrl="https://img.freepik.com/vector-gratis/concepto-bancarrota-diseno-dibujado-mano_23-2148500971.jpg?w=360" 
          linkTo="/Users" 
          texto="Egresos" 
        />
        
        <MiniContenedor 
          imagenUrl="https://img.freepik.com/vector-premium/dibujos-animados-informe-investigacion-auditoria_430232-68.jpg" 
          linkTo="/Users" 
          texto="Informe" 
        />
        <MiniContenedor 
          imagenUrl="https://static.vecteezy.com/system/resources/previews/011/382/123/original/male-customer-service-agent-with-headsets-talking-via-video-call-using-cell-phone-3d-character-illustration-png.png" 
          linkTo="/Users" 
          texto="Agente de videollamada" 
        />
      </div>
    </div>
  );
};



 
