import { describe, it, expect } from 'vitest';
import { mapError } from '../../utils/errorMapper';

describe('mapError', () => {
  it('returns null if err is falsy', () => {
    expect(mapError(null, 'categories')).toBeNull();
    expect(mapError(undefined, 'products')).toBeNull();
    expect(mapError(false, 'search')).toBeNull();
  });

  it('maps error for "categories" source', () => {
    const result = mapError(new Error('fail'), 'categories');
    expect(result).toEqual({
      title: 'Error al cargar categorías',
      message: 'No pudimos obtener la lista de categorías. Recarga la página.',
      variant: 'error',
    });
  });

  it('maps error for "products" source', () => {
    const result = mapError(new Error('fail'), 'products');
    expect(result).toEqual({
      title: 'Error al cargar productos',
      message: 'Hubo un problema cargando los productos. Recarga la página.',
      variant: 'error',
    });
  });

  it('maps error for "search" source', () => {
    const result = mapError(new Error('fail'), 'search');
    expect(result).toEqual({
      title: 'Error en la búsqueda',
      message: 'No se pudo completar la búsqueda, verifica tu conexión.',
      variant: 'warning',
    });
  });

  it('maps error for unknown source', () => {
    const result = mapError(new Error('fail'), 'unknown');
    expect(result).toEqual({
      title: 'Error inesperado',
      message: 'Ocurrió un error desconocido.',
      variant: 'error',
    });
  });

  it('maps error for missing source', () => {
    const result = mapError(new Error('fail'));
    expect(result).toEqual({
      title: 'Error inesperado',
      message: 'Ocurrió un error desconocido.',
      variant: 'error',
    });
  });
});
