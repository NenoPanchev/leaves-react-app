export function formToJSON(form: HTMLFormElement): Record<string, unknown> {
    const data = new FormData(form);
    const json: Record<string, unknown> = {};
  
    for (const [key, value] of data.entries()) {
      json[key] = value;
    }

    return json;
  }