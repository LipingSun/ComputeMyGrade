package edu.sjsu.cmpe235.project.repository;

import edu.sjsu.cmpe235.project.domain.Course;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Course entity.
 */
public interface CourseRepository extends JpaRepository<Course,Long> {

}
