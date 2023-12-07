// Based on https://github.com/shaketbaby/directory-named-webpack-plugin#readme but converted to esm and slightly rewritten by Lars

import assign from 'object-assign';
import forEachBail from 'enhanced-resolve/lib/forEachBail';
import getPaths from 'enhanced-resolve/lib/getPaths';
const basename = getPaths.basename;
function stringIncludes(string, maybeString) {
  // String.includes throws if the argument is not a string
  return typeof maybeString === 'string' ? string.includes(maybeString) : false;
}
function doApply(options, resolver) {
  // file type taken from: https://github.com/webpack/enhanced-resolve/blob/v4.0.0/test/plugins.js
  const target = resolver.ensureHook('undescribed-raw-file');
  resolver
    .getHook('before-existing-directory')
    .tapAsync(
      'DirectoryNamedWebpackPlugin',
      (request, resolveContext, callback) => {
        if (options.ignoreFn && options.ignoreFn(request)) {
          return callback();
        }
        const dirPath = request.path;
        const dirName = basename(dirPath);
        let attempts = [];
        // return if path matches with excludes
        if (
          options.exclude &&
          options.exclude.some(function (exclude) {
            return (
              dirPath.search(exclude) >= 0 || stringIncludes(dirPath, exclude)
            );
          })
        ) {
          return callback();
        }
        // return if path doesn't match with includes
        if (
          options.include &&
          !options.include.some(function (include) {
            return (
              dirPath.search(include) >= 0 || stringIncludes(dirPath, include)
            );
          })
        ) {
          return callback();
        }
        if (options.honorIndex) {
          attempts.push('index');
        }
        if (options.transformFn) {
          let transformResult = options.transformFn(dirName, dirPath, request);
          if (!Array.isArray(transformResult)) {
            transformResult = [transformResult];
          }
          transformResult = transformResult.filter(function (attemptName) {
            return typeof attemptName === 'string' && attemptName.length > 0;
          });
          attempts = attempts.concat(transformResult);
        } else {
          attempts.push(dirName);
        }
        forEachBail(
          attempts,
          function (fileName, innerCallback) {
            // approach taken from: https://github.com/webpack/enhanced-resolve/blob/v4.0.0/lib/CloneBasenamePlugin.js
            const filePath = resolver.join(dirPath, fileName);
            const obj = assign({}, request, {
              path: filePath,
              relativePath:
                request.relativePath &&
                resolver.join(request.relativePath, fileName),
            });
            resolver.doResolve(
              target,
              obj,
              'using path: ' + filePath,
              resolveContext,
              innerCallback,
            );
          },
          callback,
        );
      },
    );
}
export default (function (options) {
  const optionsToUse =
    typeof options === 'boolean' ? { honorIndex: options } : options || {};
  const exclude = optionsToUse.exclude;
  const include = optionsToUse.include;
  // make exclude array if not
  optionsToUse.exclude =
    exclude && !Array.isArray(exclude) ? [exclude] : exclude;
  // make include array if not
  optionsToUse.include =
    include && !Array.isArray(include) ? [include] : include;
  return {
    apply: doApply.bind(this, optionsToUse),
  };
});
