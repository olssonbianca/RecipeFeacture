import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setusuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedusuario = JSON.parse(localStorage.getItem('usuario'));
    if (storedusuario) {
      setusuario(storedusuario);
    }
    setLoading(false);
  }, []);

  const login = (usuarioData) => {
    setusuario(usuarioData);
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
  };

  const logout = () => {
    setusuario(null);
    localStorage.removeItem('usuario');
  };

  const actualizarUsuario = (usuarioActualizado) => {
    const usuarioActualizadoCompleto = {
      ...usuario,
      ...usuarioActualizado  // Sobrescribe solo los campos que se han actualizado
    };
    setusuario(usuarioActualizadoCompleto);
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizadoCompleto));
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading, actualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

