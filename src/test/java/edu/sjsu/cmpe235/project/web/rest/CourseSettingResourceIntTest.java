package edu.sjsu.cmpe235.project.web.rest;

import edu.sjsu.cmpe235.project.Application;
import edu.sjsu.cmpe235.project.domain.CourseSetting;
import edu.sjsu.cmpe235.project.repository.CourseSettingRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the CourseSettingResource REST controller.
 *
 * @see CourseSettingResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class CourseSettingResourceIntTest {

    private static final String DEFAULT_SETTING = "AAAAA";
    private static final String UPDATED_SETTING = "BBBBB";

    @Inject
    private CourseSettingRepository courseSettingRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCourseSettingMockMvc;

    private CourseSetting courseSetting;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CourseSettingResource courseSettingResource = new CourseSettingResource();
        ReflectionTestUtils.setField(courseSettingResource, "courseSettingRepository", courseSettingRepository);
        this.restCourseSettingMockMvc = MockMvcBuilders.standaloneSetup(courseSettingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        courseSetting = new CourseSetting();
        courseSetting.setSetting(DEFAULT_SETTING);
    }

    @Test
    @Transactional
    public void createCourseSetting() throws Exception {
        int databaseSizeBeforeCreate = courseSettingRepository.findAll().size();

        // Create the CourseSetting

        restCourseSettingMockMvc.perform(post("/api/courseSettings")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(courseSetting)))
                .andExpect(status().isCreated());

        // Validate the CourseSetting in the database
        List<CourseSetting> courseSettings = courseSettingRepository.findAll();
        assertThat(courseSettings).hasSize(databaseSizeBeforeCreate + 1);
        CourseSetting testCourseSetting = courseSettings.get(courseSettings.size() - 1);
        assertThat(testCourseSetting.getSetting()).isEqualTo(DEFAULT_SETTING);
    }

    @Test
    @Transactional
    public void getAllCourseSettings() throws Exception {
        // Initialize the database
        courseSettingRepository.saveAndFlush(courseSetting);

        // Get all the courseSettings
        restCourseSettingMockMvc.perform(get("/api/courseSettings?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(courseSetting.getId().intValue())))
                .andExpect(jsonPath("$.[*].setting").value(hasItem(DEFAULT_SETTING.toString())));
    }

    @Test
    @Transactional
    public void getCourseSetting() throws Exception {
        // Initialize the database
        courseSettingRepository.saveAndFlush(courseSetting);

        // Get the courseSetting
        restCourseSettingMockMvc.perform(get("/api/courseSettings/{id}", courseSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(courseSetting.getId().intValue()))
            .andExpect(jsonPath("$.setting").value(DEFAULT_SETTING.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCourseSetting() throws Exception {
        // Get the courseSetting
        restCourseSettingMockMvc.perform(get("/api/courseSettings/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourseSetting() throws Exception {
        // Initialize the database
        courseSettingRepository.saveAndFlush(courseSetting);

		int databaseSizeBeforeUpdate = courseSettingRepository.findAll().size();

        // Update the courseSetting
        courseSetting.setSetting(UPDATED_SETTING);

        restCourseSettingMockMvc.perform(put("/api/courseSettings")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(courseSetting)))
                .andExpect(status().isOk());

        // Validate the CourseSetting in the database
        List<CourseSetting> courseSettings = courseSettingRepository.findAll();
        assertThat(courseSettings).hasSize(databaseSizeBeforeUpdate);
        CourseSetting testCourseSetting = courseSettings.get(courseSettings.size() - 1);
        assertThat(testCourseSetting.getSetting()).isEqualTo(UPDATED_SETTING);
    }

    @Test
    @Transactional
    public void deleteCourseSetting() throws Exception {
        // Initialize the database
        courseSettingRepository.saveAndFlush(courseSetting);

		int databaseSizeBeforeDelete = courseSettingRepository.findAll().size();

        // Get the courseSetting
        restCourseSettingMockMvc.perform(delete("/api/courseSettings/{id}", courseSetting.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<CourseSetting> courseSettings = courseSettingRepository.findAll();
        assertThat(courseSettings).hasSize(databaseSizeBeforeDelete - 1);
    }
}
