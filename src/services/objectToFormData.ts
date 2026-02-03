/**
 * Converts a plain JavaScript object into a FormData instance.
 *
 * - Skips `undefined` and `null` values
 * - Appends array values using the `key[]` convention
 * - Supports File and Blob values
 * - Converts primitive values to strings automatically
 *
 * @param {Record<string, any>} data
 * An object containing key–value pairs to be converted to FormData.
 *
 * @returns {FormData}
 * A FormData instance containing all valid fields from the input object.
 *
 * @example
 * const data = {
 *   FirstName: "John",
 *   LastName: "Doe",
 *   CompanyId: 1,
 *   Services: [1, 2, 3],
 *   Photo: file, // File
 * };
 *
 * const formData = toFormData(data);
 */
export const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(`${key}`, item);
      });
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else {
      formData.append(key, value.toString());
    }
  });

  return formData;
};
