import { Request, Response } from 'express';
import { Lugar } from './../entities/lugar.entity';
import { REGION } from './../utils/region.enum';
import path from 'path';

interface LugarBody {
  nombre: string;
  latitud: string;
  longitud: string;
  localidad: string;
  region: REGION;
  url: string;
}

// Definición de las regiones y sus lugares
const regionesYlugares = {
  [REGION.PUNA]: [
    "ABRA PAMPA",
    "BARRANCAS (ABDÓN CASTRO TOLAY)",
    "SUSQUES",
    "CABRERIA",
    "CASABINDO",
    "COCHINOCA",
    "CUSI CUSI",
    "EL MORENO",
    "LA QUIACA",
    "RINCONADA",
    "RINCONADILLAS",
    "SAN FRANCISCO DE ALFARCITO",
    "SAN JUAN Y OROS",
    "SANTA CATALINA",
    "SANTUARIO DE TRES POZOS",
    "SAUSALITO",
    "YAVI",
  ],
  [REGION.QUEBRADA]: [
    "ABRA PAMPA",
    "BARRANCAS",
    "SUSQUES",
    "CABRERÍA",    
    "CASABINDO",
    "COCHINOCA",
    "CUSI CUSI",
    "EL MORENO",
    "LA QUIACA",
    "RINCONADA",
    "RINCONADILLAS",
    "SAN FRANCISCO DE AFARCITO",
    "SAN JUAN Y OROS",
    "SANTA CATALINA",
    "SANTUARIO DE TRES POZOS",
    "SAUSALITO",
    "YAVI",    
  ],
  [REGION.VALLES]: [
    "ANGOSTO DE JAIRO",
    "EL CARMEN",
    "SAN SALVADOR DE JUJUY",
    "YALA",
    "LOZANO",
    "OCLOYAS",
    "PALPALÁ",
    "PERICO",
    "SAN ANTONIO",
    "TIRAXI",
    "VILLA JARDIN DE REYES",
  ],
  [REGION.YUNGAS]: [
    "SAN FRANCISCO",
    "VILLAMONTE",
    "CALILEGUA",
    "ECOPORTAL DE PIEDRA",
    "LIBERTADOR GENERAL SAN MARTÍN",
    "PAMPICHUELA",
    "SAN PEDRO DE JUJUY",
    "VALLE GRANDE",
  ],
};

export const createLugar = async (req: Request, res: Response) => {
    try {

      const { nombre, latitud, longitud, localidad, region,url }: LugarBody = req.body;
      const lugar = new Lugar();
      lugar.nombre = nombre;
      lugar.latitud = latitud;
      lugar.longitud = longitud;
      lugar.localidad = localidad;
      lugar.region = region;
      lugar.url = url;
      
      await lugar.save();

      return res.json(lugar);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const getLugares = async (req: Request, res: Response) => {
    try {
      const lugares = await Lugar.find();
      return res.json(lugares);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const getLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;      
      const lugar = await Lugar.findOneBy({ id: parseInt(id) });
      if (!lugar) return res.status(404).json({ message: "Lugar no encontrado" });
  
      return res.json(lugar);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
};


export const updateLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const lugar = await Lugar.findOneBy({ id: parseInt(id) });
  
      if (!lugar) return res.status(404).json({ message: "Lugar no encontrado" });
  
      const { nombre, latitud, longitud, localidad, region, url }: LugarBody = req.body;
      
      lugar.nombre = nombre;
      lugar.latitud = latitud;
      lugar.longitud = longitud;
      lugar.localidad = localidad;
      lugar.region = region;
      lugar.url = url;
  
      await lugar.save();
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  


  export const deleteLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const lugar = await Lugar.findOneBy({ id: parseInt(id) });

      if (!lugar) {
        return res.status(404).json({ message: "Lugar no encontrado" });
      }
      await Lugar.delete(id);
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const getImages = async (req:Request,res:Response) => {
    try {
      const { idImage } = req.params;
      const lugar:Lugar = await Lugar.findOneOrFail({where: {id: Number(idImage)}});
      if(!lugar)
        return res.status(404).json({message: "Imagen no encontrada"});
     
      const imagePath = path.join(__dirname , '../images/', lugar.url);
      res.sendFile(imagePath);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: error.message});
      }
    }
  }