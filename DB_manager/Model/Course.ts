export interface Course {
    id: string,
    course_name: string,
    starting_date: Date,
    end_date: Date,
    minimum_pass_score: number,
    maximum_students: number,
    is_ready: boolean,
}