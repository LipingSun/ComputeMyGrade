package edu.sjsu.cmpe235.project.repository;

import edu.sjsu.cmpe235.project.domain.CourseSetting;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the CourseSetting entity.
 */
public interface CourseSettingRepository extends JpaRepository<CourseSetting,Long> {

}
