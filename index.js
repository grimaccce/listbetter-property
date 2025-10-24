/**
 * ListBetter Property - A utility for better listing and displaying object properties
 */

/**
 * List all properties of an object with detailed information
 * @param {Object} obj - The object to inspect
 * @param {Object} options - Configuration options
 * @returns {Array} Array of property information
 */
function listProperties(obj, options = {}) {
  const {
    includeInherited = false,
    includeNonEnumerable = false,
    showTypes = true,
    showValues = true
  } = options;

  const properties = [];
  const seen = new Set();

  function addProperties(target, isOwn = true) {
    const descriptors = Object.getOwnPropertyDescriptors(target);
    
    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (seen.has(key)) continue;
      seen.add(key);

      if (!includeNonEnumerable && !descriptor.enumerable) continue;

      const propInfo = {
        name: key,
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        isOwn
      };

      if (showTypes && descriptor.value !== undefined) {
        propInfo.type = typeof descriptor.value;
      }

      if (showValues && descriptor.value !== undefined) {
        propInfo.value = descriptor.value;
      }

      if (descriptor.get) propInfo.hasGetter = true;
      if (descriptor.set) propInfo.hasSetter = true;

      properties.push(propInfo);
    }
  }

  addProperties(obj, true);

  if (includeInherited) {
    let proto = Object.getPrototypeOf(obj);
    while (proto && proto !== Object.prototype) {
      addProperties(proto, false);
      proto = Object.getPrototypeOf(proto);
    }
  }

  return properties;
}

/**
 * Display properties in a formatted table-like string
 * @param {Object} obj - The object to inspect
 * @param {Object} options - Configuration options
 * @returns {String} Formatted string representation
 */
function displayProperties(obj, options = {}) {
  const properties = listProperties(obj, options);
  
  if (properties.length === 0) {
    return 'No properties found.';
  }

  const lines = ['Properties:'];
  lines.push('─'.repeat(60));

  properties.forEach(prop => {
    let line = `  ${prop.name}`;
    
    if (prop.type) {
      line += ` (${prop.type})`;
    }

    const attrs = [];
    if (!prop.enumerable) attrs.push('non-enum');
    if (!prop.configurable) attrs.push('non-config');
    if (prop.writable === false) attrs.push('readonly');
    if (prop.hasGetter) attrs.push('getter');
    if (prop.hasSetter) attrs.push('setter');
    if (!prop.isOwn) attrs.push('inherited');

    if (attrs.length > 0) {
      line += ` [${attrs.join(', ')}]`;
    }

    if (options.showValues && prop.value !== undefined) {
      const valueStr = JSON.stringify(prop.value);
      if (valueStr.length > 50) {
        line += `\n    Value: ${valueStr.substring(0, 50)}...`;
      } else {
        line += `\n    Value: ${valueStr}`;
      }
    }

    lines.push(line);
  });

  return lines.join('\n');
}

/**
 * Get properties grouped by type
 * @param {Object} obj - The object to inspect
 * @returns {Object} Properties grouped by their type
 */
function groupByType(obj) {
  const properties = listProperties(obj, { showTypes: true, showValues: false });
  const grouped = {};

  properties.forEach(prop => {
    const type = prop.type || 'unknown';
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(prop.name);
  });

  return grouped;
}

/**
 * Count properties by various criteria
 * @param {Object} obj - The object to inspect
 * @returns {Object} Count statistics
 */
function countProperties(obj) {
  const properties = listProperties(obj, { 
    includeNonEnumerable: true,
    includeInherited: false 
  });

  return {
    total: properties.length,
    enumerable: properties.filter(p => p.enumerable).length,
    nonEnumerable: properties.filter(p => !p.enumerable).length,
    writable: properties.filter(p => p.writable).length,
    readonly: properties.filter(p => p.writable === false).length,
    withGetters: properties.filter(p => p.hasGetter).length,
    withSetters: properties.filter(p => p.hasSetter).length
  };
}

module.exports = {
  listProperties,
  displayProperties,
  groupByType,
  countProperties
};
