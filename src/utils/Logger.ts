class Logger {
  static internalError(message: string, ...optionalParams: any[]) {
    console.error(
      "-----------------------------------------------------------------"
    );
    console.error("PLEASE REPORT TO DEVELOPER");
    console.error(
      "-----------------------------------------------------------------"
    );
    console.error("   ");
    console.error(message, ...optionalParams);
    console.error("   ");
    console.error(
      "-----------------------------------------------------------------"
    );
    console.error("PLEASE REPORT TO DEVELOPER");
    console.error(
      "-----------------------------------------------------------------"
    );
  }

  static userError(message: string, ...optionalParams: any[]) {
    console.error(
      "-----------------------------------------------------------------"
    );
    console.error(message, ...optionalParams);
    console.error(
      "-----------------------------------------------------------------"
    );
  }

  static log(message: string, ...optionalParams: any[]) {
    console.debug("--- LOG ---");
    console.debug(message, ...optionalParams);
    console.debug("--- LOG ---");
  }
}

export default Logger;
