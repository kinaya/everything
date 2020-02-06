// Filter and sort the items
export const filterAndSortItems = (items, form, sortByDistance) => {

  // Default filter and order
  let key = 'datePosted'
  let order = 'desc'
  if(sortByDistance) {
    key = 'distance'
    order = 'asc'
  }
  let searchQuery = '';
  let typeArray = ['lend', 'giveaway', 'public']

  // User defined filter and order
  if(form.itemFilterForm && form.itemFilterForm.values) {
    const filter = form.itemFilterForm.values

    if(filter.order) {
      key = filter.order.split('_')[0]
      order = filter.order.split('_')[1]
    }

    if(filter.search) {
      searchQuery = filter.search.toLowerCase()
    }

    // TypeFilter
    typeArray = []
    filter.display_lend && typeArray.push('lend')
    filter.display_giveaway && typeArray.push('giveaway')
    filter.display_public && typeArray.push('public')
  }

  // Filter items
  const filteredItems = items.filter(item => (
    item.visibility &&
    typeArray.includes(item.type) &&
    (
      item.title.toLowerCase().includes(searchQuery) ||
      item.body.toLowerCase().includes(searchQuery) ||
      item._user.name.toLowerCase().includes(searchQuery)
    )
  ))

  // Sort items
  const sortedItems = filteredItems.sort(sortObjects(key, order));

  return sortedItems;
}


const sortObjects = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}
