const GlobalPDFOptions = Object.create(null);

GlobalPDFOptions.onParsedAnnotations =
GlobalPDFOptions.onParsedAnnotations === undefined
    ? null
    : GlobalPDFOptions.onParsedAnnotations;

export { GlobalPDFOptions };