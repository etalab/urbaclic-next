function fetchFromBAN(query) {
  if (!query) {
    return Promise.resolve({ result: [] });
  }

  return fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`, { method: 'get' })
    .then(response => response.json())
    .then((json) => {
      const result = json.features.map(feature => ({
        coordinates: feature.geometry.coordinates,
        label: feature.properties.label,
      }));

      return { result };
    })
    .catch(err => ({ err }));
}

export default {
  fetchFromBAN,
};
