import { motion } from 'framer-motion';
import { services } from '../constants/index'; // Certifique-se de ajustar o caminho de importação.

const Jobs = () => {
  return (
    <div className="w-full h-auto py-6 text-center">
      <div className="my-8 mx-4 justify-center text-slate-100">
        <h2 className="text-5xl font-bold mb-10">Nossos Serviços</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-azul-vr/40 p-6 rounded-lg shadow-white-100/60 shadow-inner border-b-2 border-verde-vr/80 flex flex-col items-center transition-transform duration-300 ease-in-out"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-[90%] h-auto  border-indigo-700 rounded-lg my-auto mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <h3 className="text-2xl font-semibold mb-2 text-white">{service.title}</h3>
              <p className="text-slate-300 text-sm mx-6">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
