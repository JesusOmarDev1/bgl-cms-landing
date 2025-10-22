// Simple CSS loader for Node.js ESM
export async function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith('.css')) {
    return {
      url: new URL('data:text/javascript,export default {}').href,
      shortCircuit: true,
    }
  }
  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('data:text/javascript,')) {
    return {
      format: 'module',
      source: 'export default {}',
      shortCircuit: true,
    }
  }
  return nextLoad(url, context)
}
