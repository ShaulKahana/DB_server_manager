import {Class_detes} from './Class_dates'
import {Syllabus} from './Syllabus'


export interface Course {
    id: string,
    course_name: string,
    starting_date: Date,
    end_date: Date,
    minimum_pass_score: number,
    maximum_students: number,
    is_ready: boolean,
    class_dates: Array<Class_detes>
    syllabus: Array<Syllabus>
}