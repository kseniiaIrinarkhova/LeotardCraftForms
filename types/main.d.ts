/**Rhinestones Types: "Sew-on", "HotFix", "No-HotFix" */
type RhinestonesType = "Sew-on" |"HotFix" | "No-HotFix";

/**Rhinestone type */
type Rhinestone = {
    /**
     * The ID of rhinestone
     */
    id: number;
    /**
     * Type of the rhinestone
     */
    type: RhinestonesType;
    /**
     * Information about rhinestones size
     */
    size: string;
    /**
     * Information about rhinestones color in HEX format
     */
    color: string;
    /**
     * Additional link for resources
     */
    url: string; 
};

/**Project type */
type Project ={
    /**
     * Project ID
     */
    id: number;
    /**
     * Project title
     */
    title: string;
    /**
     * The list of rhinestones that is used in project
     */
    rhinestones?: Rhinestone[];
};

export{RhinestonesType, Rhinestone, Project}