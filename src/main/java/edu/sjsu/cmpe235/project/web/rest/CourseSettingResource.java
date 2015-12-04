package edu.sjsu.cmpe235.project.web.rest;

import com.codahale.metrics.annotation.Timed;
import edu.sjsu.cmpe235.project.domain.CourseSetting;
import edu.sjsu.cmpe235.project.repository.CourseSettingRepository;
import edu.sjsu.cmpe235.project.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CourseSetting.
 */
@RestController
@RequestMapping("/api")
public class CourseSettingResource {

    private final Logger log = LoggerFactory.getLogger(CourseSettingResource.class);
        
    @Inject
    private CourseSettingRepository courseSettingRepository;
    
    /**
     * POST  /courseSettings -> Create a new courseSetting.
     */
    @RequestMapping(value = "/courseSettings",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<CourseSetting> createCourseSetting(@RequestBody CourseSetting courseSetting) throws URISyntaxException {
        log.debug("REST request to save CourseSetting : {}", courseSetting);
        if (courseSetting.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("courseSetting", "idexists", "A new courseSetting cannot already have an ID")).body(null);
        }
        CourseSetting result = courseSettingRepository.save(courseSetting);
        return ResponseEntity.created(new URI("/api/courseSettings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("courseSetting", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courseSettings -> Updates an existing courseSetting.
     */
    @RequestMapping(value = "/courseSettings",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<CourseSetting> updateCourseSetting(@RequestBody CourseSetting courseSetting) throws URISyntaxException {
        log.debug("REST request to update CourseSetting : {}", courseSetting);
        if (courseSetting.getId() == null) {
            return createCourseSetting(courseSetting);
        }
        CourseSetting result = courseSettingRepository.save(courseSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("courseSetting", courseSetting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courseSettings -> get all the courseSettings.
     */
    @RequestMapping(value = "/courseSettings",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<CourseSetting> getAllCourseSettings() {
        log.debug("REST request to get all CourseSettings");
        return courseSettingRepository.findAll();
            }

    /**
     * GET  /courseSettings/:id -> get the "id" courseSetting.
     */
    @RequestMapping(value = "/courseSettings/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<CourseSetting> getCourseSetting(@PathVariable Long id) {
        log.debug("REST request to get CourseSetting : {}", id);
        CourseSetting courseSetting = courseSettingRepository.findOne(id);
        return Optional.ofNullable(courseSetting)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /courseSettings/:id -> delete the "id" courseSetting.
     */
    @RequestMapping(value = "/courseSettings/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCourseSetting(@PathVariable Long id) {
        log.debug("REST request to delete CourseSetting : {}", id);
        courseSettingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("courseSetting", id.toString())).build();
    }
}
