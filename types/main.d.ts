/**Rhinestones Types: "Sew-on", "HotFix", "No-HotFix" */
type RhinestonesType = "Sew-on" | "HotFix" | "No-HotFix";

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
     * Information about rhinestones color
     */
    color: string;
    /**
     * Additional link for resources
     */
    url?: string;
};

/**Project type */
type Project = {
    /**
     * Project ID
     */
    id: number;
    /**
     * Foreign key for User object. ID of user that created project
     */
    userId: number;
    /**
     * Project title
     */
    title: string;
    /**
     * The list of rhinestones and its amount that is used in project
     */
    rhinestones?: { rhinestoneId: number, amount: number }[];
};

/**User type */
type User = {
    /**
     * User ID
     */
    id: number;
    /**
     * Username
     */
    userName: string;
    /**
     * User first name
     */
    firstName: string;
    /**
     * User last name
     */
    lastName: string;
    /**
     * User email
     */
    email: string;
}


export { RhinestonesType, Rhinestone, Project, User }