type ErrorResponse = {
    errors?: {
        [key: string]: string[];
    };
    [key: string]: any;
};

type ErrorListItem = {
    code: string;
    description: string;
};

function ExtractErrorMessages(errorObj: ErrorResponse | ErrorListItem[] | null | undefined): string[] {
    if (!errorObj) return [];

    if (Array.isArray(errorObj)) {
        return errorObj.map(err => err.description);
    }

    if (errorObj.errors) {
        return Object.values(errorObj.errors).flat().filter(x => x != null);
    }

    return [];
}

export default ExtractErrorMessages;
