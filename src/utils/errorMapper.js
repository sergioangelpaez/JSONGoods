export const mapError = (err, source) => {
  if (!err) return null;
  switch (source) {
    case 'categories':
      return {
        title: 'Error al cargar categorías',
        message: 'No pudimos obtener la lista de categorías. Recarga la página.',
        variant: 'error',
      };
    case 'products':
      return {
        title: 'Error al cargar productos',
        message: 'Hubo un problema cargando los productos. Recarga la página.',
        variant: 'error',
      };
    case 'search':
      return {
        title: 'Error en la búsqueda',
        message: 'No se pudo completar la búsqueda, verifica tu conexión.',
        variant: 'warning',
      };
    default:
      return {
        title: 'Error inesperado',
        message: 'Ocurrió un error desconocido.',
        variant: 'error',
      };
  }
};
